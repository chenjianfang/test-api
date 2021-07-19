/**
 * expectData属于compareData的子集，比较属性类型
 * @param expectData，预期对象
 * @param compareData，比较对象
 * @returns {{pass: boolean, message: {(): string, (): string}}}
 */
const propTypeCompare = (expectData, compareData) => {
  let pass = true;
  let message = '';
  function deep(obj, compareObj) {
    if (pass === false) {
      return;
    }
    if (typeof obj !== 'object' || typeof compareObj !== 'object') {
      message = `预期字段: ${obj}；实际字段 ${compareObj}`
      pass = false;
      return;
    }

    Object.entries(obj).forEach(([key, value], index) => {
      const valueType = typeof value;
      const compareType = typeof compareObj[key];
      if (valueType === 'object') {
        deep(value, compareObj[key]);
      } else {
        if (valueType !== compareType) {
          message = `第${index + 1}条记录；${key}字段对比失败； 预期类型: ${valueType}； 实际类型: ${compareType}`
          pass = false;
        }
      }
    })
  }
  deep(expectData, compareData);

  return {
    message: pass
      ? () => `success! ${message}`
      : () => `fail! ${message}`,
    pass,
  };
}

module.exports = propTypeCompare;