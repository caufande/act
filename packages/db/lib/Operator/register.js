let instance = null;
export function regOperator(operator) {
    instance = operator;
}
export function getOperator() {
    if (instance === null)
        throw Error('No Operator instance!');
    return instance;
}
