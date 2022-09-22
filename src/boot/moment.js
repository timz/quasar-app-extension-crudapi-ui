import moment from 'moment'

moment.locale('ru')
export default (({ app }) => {
  app.config.globalProperties.$moment = moment
})


/*
import moment from 'moment'

export default async ({ Vue }) => {
  moment.locale('ru')
  Vue.prototype.$moment = moment
}
*/
export {moment}
