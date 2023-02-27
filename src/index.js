module.exports = function check(str, bracketsConfig) {
    if (!bracketsConfig.length || str.length % 2) return false;
    const splitedString = str.split('');
    const stack = [];
    let nope = true;

    splitedString.forEach(bracket => {
        const isOpeningBracket = bracketsConfig.some(
            ([opening, closing]) => opening === bracket,
        );
        const isClosingBracket = bracketsConfig.some(
            ([opening, closing]) => closing === bracket,
        );
        if (isOpeningBracket) {
            const [, closing] = bracketsConfig.find(
                ([opening, closing]) => opening === bracket,
            );
            if (bracket === closing && stack[stack.length - 1] === bracket) {
                stack.pop();
            } else {
                stack.push(bracket);
            }
        } else if (isClosingBracket) {
            const [opening] = bracketsConfig.find(
                ([opening, closing]) => closing === bracket,
            );
            if (stack[stack.length - 1] === opening) {
                stack.pop();
            } else {
                nope = false;
            }
        }
    });

    return stack.length === 0 && nope;
};
