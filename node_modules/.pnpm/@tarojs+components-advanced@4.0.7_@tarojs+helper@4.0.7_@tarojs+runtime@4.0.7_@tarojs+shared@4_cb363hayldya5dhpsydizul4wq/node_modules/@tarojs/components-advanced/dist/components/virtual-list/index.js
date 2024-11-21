const VirtualList = (process.env.FRAMEWORK === 'vue' || process.env.FRAMEWORK === 'vue3')
    ? require('./vue').default
    : require('./react').default;

export { VirtualList, VirtualList as default };
//# sourceMappingURL=index.js.map
