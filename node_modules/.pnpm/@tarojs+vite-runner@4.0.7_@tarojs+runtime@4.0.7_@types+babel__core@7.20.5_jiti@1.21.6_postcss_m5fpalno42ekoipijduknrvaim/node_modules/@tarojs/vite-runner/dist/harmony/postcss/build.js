"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toOutputFilePathInCss = exports.createToImportMetaURLBasedRelativeRuntime = exports.toOutputFilePathInJS = void 0;
const node_path_1 = __importDefault(require("node:path"));
const utils_1 = require("../../utils");
const rollup_1 = require("../../utils/rollup");
function joinUrlSegments(a, b) {
    if (!a || !b)
        return a || b || '';
    return (0, utils_1.stripTrailingSlash)(a) + (0, utils_1.addLeadingSlash)(b);
}
const customRelativeUrlMechanisms = Object.assign(Object.assign({}, rollup_1.relativeUrlMechanisms), { 'worker-iife': (relativePath) => (0, rollup_1.getResolveUrl)(`'${relativePath}', self.location.href`) });
function toOutputFilePathInJS(filename, type, hostId, hostType, config, toRelative) {
    const { renderBuiltUrl } = config.experimental;
    let relative = config.base === '' || config.base === './';
    if (renderBuiltUrl) {
        const result = renderBuiltUrl(filename, {
            hostId,
            hostType,
            type,
            ssr: !!config.build.ssr,
        });
        if (typeof result === 'object') {
            if (result.runtime) {
                return { runtime: result.runtime };
            }
            if (typeof result.relative === 'boolean') {
                relative = result.relative;
            }
        }
        else if (result) {
            return result;
        }
    }
    if (relative && !config.build.ssr) {
        return toRelative(filename, hostId);
    }
    return joinUrlSegments(config.base, filename);
}
exports.toOutputFilePathInJS = toOutputFilePathInJS;
function createToImportMetaURLBasedRelativeRuntime(format, isWorker) {
    const formatLong = isWorker && format === 'iife' ? 'worker-iife' : format;
    const toRelativePath = customRelativeUrlMechanisms[formatLong];
    return (filename, importer) => ({
        runtime: toRelativePath(node_path_1.default.posix.relative(node_path_1.default.dirname(importer), filename)),
    });
}
exports.createToImportMetaURLBasedRelativeRuntime = createToImportMetaURLBasedRelativeRuntime;
function toOutputFilePathWithoutRuntime(filename, type, hostId, hostType, config, toRelative) {
    const { renderBuiltUrl } = config.experimental;
    let relative = config.base === '' || config.base === './';
    if (renderBuiltUrl) {
        const result = renderBuiltUrl(filename, {
            hostId,
            hostType,
            type,
            ssr: !!config.build.ssr,
        });
        if (typeof result === 'object') {
            if (result.runtime) {
                throw new Error(`{ runtime: "${result.runtime}" } is not supported for assets in ${hostType} files: ${filename}`);
            }
            if (typeof result.relative === 'boolean') {
                relative = result.relative;
            }
        }
        else if (result) {
            return result;
        }
    }
    if (relative && !config.build.ssr) {
        return toRelative(filename, hostId);
    }
    else {
        return joinUrlSegments(config.base, filename);
    }
}
exports.toOutputFilePathInCss = toOutputFilePathWithoutRuntime;
//# sourceMappingURL=build.js.map