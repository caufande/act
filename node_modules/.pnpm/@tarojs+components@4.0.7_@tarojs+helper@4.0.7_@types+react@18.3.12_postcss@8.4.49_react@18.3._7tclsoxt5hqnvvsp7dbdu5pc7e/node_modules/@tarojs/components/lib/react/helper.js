const manipulatePropsFunction = (originalProps, propsToPass = {}) => {
    const { dangerouslySetInnerHTML, style } = originalProps;
    if (typeof style !== 'string') {
        propsToPass.style = style;
    }
    return Object.assign(Object.assign({}, propsToPass), { dangerouslySetInnerHTML });
};

export { manipulatePropsFunction };
//# sourceMappingURL=helper.js.map
