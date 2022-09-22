import {createI18n} from 'vue-i18n'
import messages from '../i18n'

export const i18n = createI18n({locale: 'ru', messages})

export default ({app}) => {
  app.config.globalProperties.$i18n = i18n
  app.use(i18n)
}
