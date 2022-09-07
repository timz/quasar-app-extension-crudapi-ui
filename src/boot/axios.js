import {boot} from "quasar/wrappers"
import axios from 'axios'
import {Notify} from 'quasar'

const requestHandler = request => {
  const token = localStorage.getItem(process.env.AUTH_TOKEN_NAME)
  request.headers.Authorization = 'Bearer ' + token
  request.headers.accept = 'application/json'

  return request;
};

const responseHandler = response => {
  if (response.data.status === false) {
    let msg =''
    let objNotifyWarn = {type: 'warning', message: 'Ошибка', html: true}
    switch (response.data.code) {
      case 401:
        Notify.create({
          type: 'negative',
          html: false,
          textColor: 'white',
          message: 'Ошибка авторизации. Попробуйте перезайти.'
        })
         // window.location = '/#/auth/login'
        break
      case 403:
        objNotifyWarn.message = (response.data.errors) || 'У вас нет доступа к этой функции'
        Notify.create(objNotifyWarn)
        break
      case 404:
        objNotifyWarn.message = (response.data.errors.message) || 'Такого ресурса не существует'
        Notify.create(objNotifyWarn)
        break
      case 422:
        let errors = response.data.errors
        switch (typeof errors) {
          case 'string':
            msg = response.data.errors
            break
          case 'object':
            // console.warn(Object.keys(errors))
            msg = Object.keys(errors).map(function (key) {
              return `${errors[key]}<br/>`
            }).join(" И ")
            break

        }
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach(element => {
            msg += element.message + '<br/>'
          })
        }
        objNotifyWarn.message = (msg) || 'Проверьте правильность введенных данных'
        Notify.create(objNotifyWarn)
        break
      case 500:
        console.warn(response.data)
        let code = (response.data.errors.code)
        msg = '<b>Ошибка на сервере.</b> Обновите страницу и попробуйте еще раз. <br/> Если ошибка повторилась, обратитесь к администратору'
        switch (code) {
          case 23000:
            objNotifyWarn.message = 'Запись с таким ключом уже существует'
            break
          default:
            objNotifyWarn.type = 'negative'
            objNotifyWarn.message = msg
        }
        Notify.create(objNotifyWarn)
        break
      default:
        objNotifyWarn.message = (response.data.errors) || 'Неизвестная ошибка'
        Notify.create(objNotifyWarn)
        break
    }
  }

  return response;
};

const errorHandler = error => {
  return Promise.reject(error);
};

export const api = axios.create({baseURL: process.env.BASE_API_URL})
api.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
api.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
export const axi = axios.create({baseURL: process.env.BASE_URL})
axi.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);
axi.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
export default boot(({app, router}) => {
  app.config.globalProperties.$axios = axi
  app.config.globalProperties.$api = api
})
