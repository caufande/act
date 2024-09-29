const VALID_COLOR_REG = /^#[0-9a-fA-F]{6}$/;
const isValidColor = (color) => {
    return VALID_COLOR_REG.test(color);
};

export { isValidColor };
//# sourceMappingURL=valid.js.map
