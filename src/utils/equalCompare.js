const equalCompare = (expectData, compareData, where = {}) => {
  let pass = true;
  let message = '';
  const hasWhere = Object.keys(where).length > 0;

  function deep(obj, compareObj) {
    if (pass === false) {
      return;
    }
    if (typeof obj !== 'object' || typeof compareObj !== 'object') {
      message = `预期字段: ${obj}；实际字段 ${compareObj}`
      pass = false;
      return;
    }
    const objEntries = Object.entries(obj);
    let objPass = true;
    for(let index = 0; index < objEntries.length; index += 1) {
      const [key, value] = objEntries[index];
      const compareValue = compareObj[key];
      if (typeof value === 'object') {
        deep(value, compareValue);
      } else {
        if (hasWhere && value === where[key]) {
          objPass = true;
          break;
        }
        if (value !== compareValue) {
          message = `${key}字段对比失败； 预期值: ${value}； 实际值: ${compareValue}`
          objPass = false;
        }
      }
    }
    if (objPass === false) {
      pass = false;
    }
  }
  deep(expectData, compareData);

  return {
    message: pass
      ? () => `success! ${message}`
      : () => `fail! ${message}`,
    pass,
  };
}

module.exports = equalCompare;