export default ({app}) => {
  const t = app.config.globalProperties.$i18n.global.t
  app.config.globalProperties.$v = {
    compareValues: (val, compareValue, compareField = null, errMsg = t('validation.compareValues',{vl: compareField ? compareField : compareValue})) => {
      return (val) => (val == null || val === compareValue) || errMsg
    },
    strMaxLength: (maxLength, val,  errMsg = t('validation.stringMaxLength',{vl: maxLength})) => {
      return (val) => (val == null || val.length <= maxLength) || errMsg
    },
    strMinLength: (minLength,val,  errMsg = t('validation.stringMinLength',{vl: minLength})) => {
      return (val) => (val == null || val.length >= minLength) || errMsg
    },
    strFixLength: (fixLength, val,  errMsg = t('validation.stringFixLength', {vl: fixLength})) => {
      return (val) => (val === undefined || val.length === fixLength) ||errMsg
    },
    strRegexp: (regexpStr, val,  errMsg = t('validation.stringRegexp', {vl: regexpStr})) => {
      return (val) => (val === undefined || new RegExp(regexpStr).test(val)) ||errMsg
    },
    required: (val, errMsg = t('validation.required')) => {
      return (val) => (val !== undefined && val !== null && val !== '') || errMsg
    },
    numMax: (maxVal,val,  errMsg = t('validation.numberMax', {vl: maxVal})) => {
      return (val) => (val == null || val <= maxVal) || errMsg
    },
    numMin: (minVal,val,  errMsg = t('validation.numberMin', {vl: minVal})) => {
      return (val) => (val == null || val >= minVal) || errMsg
    }
  }
}
