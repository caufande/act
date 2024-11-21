/**
 * Modify from https://github.com/ionic-team/stencil-ds-output-targets/blob/main/packages/react-output-target/react-component-lib/utils/case.ts
 * MIT License https://github.com/ionic-team/stencil-ds-output-targets/blob/main/LICENSE
 */
const dashToPascalCase = (str) => str
    .toLowerCase()
    .split('-')
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');
const camelToDashCase = (str) => str.replace(/([A-Z])/g, (m) => `-${m[0].toLowerCase()}`);

export { camelToDashCase, dashToPascalCase };
//# sourceMappingURL=case.js.map
