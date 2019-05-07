/**
 * 格式化余额保留两位小数
 * 
 * @param {*} money 分
 */
function formatMoney(money) {
    let last = money % 100;
    let index = 2;
    if (last == 0) {
        index = 0;
    } else if (last % 10 == 0) {
        index = 1;
    }
    return (money / 100).toFixed(index);
}

module.exports = {
    formatMoney: formatMoney
};