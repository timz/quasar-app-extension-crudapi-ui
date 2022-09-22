export default ({ Vue }) => {
  Vue.filter('localeDateTime', (val, template) => {
    if (Vue.prototype.$moment(val, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
      return Vue.prototype.$moment(val, 'YYYY-MM-DD HH:mm:ss', true).format(template)
    }
    return val
  })
  Vue.filter('localeDate', (val, template) => {
    if (Vue.prototype.$moment(val, 'YYYY-MM-DD', true).isValid()) {
      return Vue.prototype.$moment(val, 'YYYY-MM-DD', true).format(template)
    }
    return val
  })

  Vue.filter('localeTime', (val, template) => {
    if (Vue.prototype.$moment(val, 'HH:mm:ss', true).isValid()) {
      return Vue.prototype.$moment(val, 'HH:mm:ss', true).format(template)
    }
    return val
  })
}
