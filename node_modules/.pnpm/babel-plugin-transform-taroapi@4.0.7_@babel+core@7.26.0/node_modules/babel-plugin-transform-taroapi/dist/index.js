"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const plugin = function (babel) {
    const t = babel.types;
    // 这些变量需要在每个 program 里重置
    const invokedApis = new Map();
    let taroName;
    let needDefault;
    let referTaro;
    function canIUse(definition, scheme = '') {
        if (!scheme)
            return false;
        const o = (0, lodash_1.setWith)({}, scheme, true, Object);
        return (0, lodash_1.isMatchWith)(definition, o, (a, b) => {
            if (a === '*' || b === true)
                return true;
        });
    }
    function replaceCanIUse(ast, definition) {
        const args = ast.node.arguments;
        if (args.length < 1)
            return;
        // Note: 暂不考虑其他类型的参数映射
        if (t.isStringLiteral(args[0])) {
            const isSupported = canIUse(definition, args[0].value);
            ast.replaceInline(t.booleanLiteral(isSupported));
        }
    }
    return {
        name: 'babel-plugin-transform-taro-api',
        pre() {
            const { opts = {} } = this;
            const { apis = new Set(), bindingName = 'Taro', packageName = '@tarojs/taro-h5', definition = {} } = opts;
            this.definition = Object.assign(Object.assign(Object.assign({}, definition.apis), definition.components), { [this.canIUse]: '*' });
            this.bindingName = bindingName;
            this.packageName = packageName;
            this.canIUse = 'canIUse';
            if (apis.size < 1) {
                apis.add(this.canIUse);
                Object.keys(definition.apis || {}).forEach(key => apis.add(key));
            }
            this.apis = apis;
        },
        visitor: {
            ImportDeclaration(ast) {
                if (ast.node.source.value !== this.packageName)
                    return;
                ast.node.specifiers.forEach(node => {
                    if (t.isImportDefaultSpecifier(node)) {
                        needDefault = true;
                        taroName = node.local.name;
                    }
                    else if (t.isImportSpecifier(node)) {
                        const { imported } = node;
                        const propertyName = t.isIdentifier(imported) ? imported.name : imported.value;
                        if (this.apis.has(propertyName)) { // 记录api名字
                            ast.scope.rename(node.local.name);
                            invokedApis.set(propertyName, node.local.name);
                        }
                        else { // 如果是未实现的api 改成Taro.xxx
                            needDefault = true;
                            const localName = node.local.name;
                            const binding = ast.scope.getBinding(localName);
                            const idn = t.identifier(taroName);
                            referTaro.push(idn);
                            binding && binding.referencePaths.forEach(reference => {
                                reference.replaceWith(t.memberExpression(idn, t.identifier(propertyName)));
                            });
                        }
                    }
                });
            },
            MemberExpression(ast) {
                /* 处理Taro.xxx */
                const isTaro = t.isIdentifier(ast.node.object, { name: taroName });
                const property = ast.node.property;
                let propertyName = null;
                let propName = 'name';
                if (!isTaro)
                    return;
                // 兼容一下 Taro['xxx']
                if (t.isStringLiteral(property)) {
                    propName = 'value';
                }
                propertyName = property[propName];
                if (!propertyName)
                    return;
                // 同一api使用多次, 读取变量名
                if (this.apis.has(propertyName)) {
                    const parentNode = ast.parent;
                    const isAssignment = t.isAssignmentExpression(parentNode) && parentNode.left === ast.node;
                    if (!isAssignment) {
                        let identifier;
                        if (invokedApis.has(propertyName)) {
                            identifier = t.identifier(invokedApis.get(propertyName));
                        }
                        else {
                            const newPropertyName = ast.scope.generateUid(propertyName);
                            invokedApis.set(propertyName, newPropertyName);
                            /* 未绑定作用域 */
                            identifier = t.identifier(newPropertyName);
                        }
                        ast.replaceWith(identifier);
                    }
                }
                else {
                    needDefault = true;
                }
            },
            CallExpression(ast) {
                if (!ast.scope.hasReference(this.canIUse))
                    return;
                const callee = ast.node.callee;
                if (t.isMemberExpression(callee) && t.isIdentifier(callee.object, { name: taroName })) {
                    let propertyName = null;
                    let propName = 'name';
                    // 兼容一下 Taro['xxx']
                    if (t.isStringLiteral(callee.property)) {
                        propName = 'value';
                    }
                    propertyName = callee.property[propName];
                    if (propertyName === this.canIUse) {
                        // Taro.canIUse or Taro['canIUse']
                        replaceCanIUse(ast, this.definition);
                    }
                }
                else if (invokedApis.has(this.canIUse)) {
                    const { name } = t.identifier(invokedApis.get(this.canIUse));
                    const isCanIUse = t.isIdentifier(callee, { name });
                    // canIUse as _canIUse
                    if (isCanIUse)
                        replaceCanIUse(ast, this.definition);
                }
            },
            Program: {
                enter(ast) {
                    needDefault = false;
                    referTaro = [];
                    invokedApis.clear();
                    taroName = ast.scope.getBinding(this.bindingName)
                        ? ast.scope.generateUid(this.bindingName)
                        : this.bindingName;
                },
                exit(ast) {
                    const that = this;
                    // 防止重复引入
                    let isTaroApiImported = false;
                    referTaro.forEach(node => {
                        node.name = taroName;
                    });
                    ast.traverse({
                        ImportDeclaration(ast) {
                            const isImportingTaroApi = ast.node.source.value === that.packageName;
                            if (!isImportingTaroApi)
                                return;
                            if (isTaroApiImported)
                                return ast.remove();
                            isTaroApiImported = true;
                            const namedImports = Array.from(invokedApis.entries()).map(([imported, local]) => t.importSpecifier(t.identifier(local), t.identifier(imported)));
                            if (needDefault) {
                                const defaultImport = t.importDefaultSpecifier(t.identifier(taroName));
                                ast.node.specifiers = [
                                    defaultImport,
                                    ...namedImports
                                ];
                                needDefault = false;
                            }
                            else {
                                ast.node.specifiers = namedImports;
                            }
                        },
                        CallExpression(ast) {
                            if (!invokedApis.has(that.canIUse))
                                return;
                            const callee = ast.node.callee;
                            const { name } = t.identifier(invokedApis.get(that.canIUse));
                            const isCanIUse = t.isIdentifier(callee, { name });
                            if (isCanIUse) {
                                // canIUse as _use
                                replaceCanIUse(ast, that.definition);
                            }
                        },
                    });
                }
            }
        }
    };
};
exports.default = plugin;
