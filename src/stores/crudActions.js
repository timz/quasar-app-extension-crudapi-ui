import {api} from "../boot/axios"
import _ from "lodash"
import {useMeStore} from "@crudapi/stores/me"
import {toRaw} from 'vue'

const _meStore = useMeStore()
export const actions = {
  /**
   * Возвращает лейбл поля по его id
   * @param id {String}
   * @returns {any}
   */
  label(id) {
    return _.get(this, 'crudMeta.labels.' + id, id)
  },

  /**
   * Сброс модели для редактирования
   */
  resetModel() {
    for (const key in this.editModel) {
      this.editModel[key] = null
    }
  },

  /**
   * Сброс фильтра поиска на Index странице
   */
  resetFilter() {
    for (const key in this.filterModel) {
      this.filterModel[key] = null
    }
  },

  /**
   * Загрузка модели
   * @param id {String|Integer}
   * @returns {Promise<*>}
   */
  async loadModel(id) {
    let requestUrl = id ? this.getLoadModelUrl : this.getNewModelUrl
    let requestBody = id ? {[this.getPkField]: id} : {}

    const response = await api.post(requestUrl, requestBody)
    let result = response.data
    if (result.status === true) {
      this.resetModel()
      let model = result.content
      this.editModel = {...this.editModel, ...model}

      if (model[this.getPkField]) {
        this.editModel.oldPk = model[this.getPkField]
      }
    } else {
      console.warn(response.data, 'Ошибка при получении модели')
    }
    return this.editModel
  },

  /**
   * Сохранение модели на сервере
   * @returns {Promise<AxiosResponse<any>>}
   */
  async submitModel() {
    try {
      const response = await api.post(this.getSaveModelUrl, this.editModel)
      if (response.data.status === true) {
        this.resetModel()
        let model = response.data.content
        this.editModel = {...this.editModel, ...model}
        if (model[this.getPkField]) {
          this.editModel.oldPk = model[this.getPkField]
          this.router.replace({params: {id: model[this.getPkField]}})
        }
      } else {
        if (response.data.code === 409) {
          this.editModel._forceSave = true
        }

      }
      return response
    } catch (err) {
      console.warn(err, 'Ошибка при отправке записи');
    }

  },
  /**
   * Удаление модели с сервера
   * @param id {String|Integer}
   * @returns {Promise<AxiosResponse<any>>}
   */
  async deleteModel(id) {
    try {
      return await api.post(this.getDeleteModelUrl, {[this.getPkField]: id})
    } catch (err) {
      console.warn(err, 'Ошибка при удалении записи');
    }
  }
}

export const getters = {
  getUserCanCreate(state) {
    const permission = toRaw(_.get(state, 'crudMeta.permissions.create', undefined))
    return _meStore.userCan(permission)
  },
  getUserCanEdit(state) {
    const permission = toRaw(_.get(state, 'crudMeta.permissions.edit', undefined))
    return _meStore.userCan(permission)
  },
  getUserCanDelete(state) {
    const permission = toRaw(_.get(state, 'crudMeta.permissions.delete', undefined))
    return _meStore.userCan(permission)
  },
  /**
   * Получаем список столбцов для CrudTable
   * @param state
   * @returns {Array}
   */
  getIndexPageColumns(state) {
    const columns = toRaw(_.get(state, 'crudMeta.indexPage.columns', []))
    const filteredColumns = _.filter(columns, function (col) {
      const permissions = col.permissions
      //! if (!permissions){
      //   return true
      // }
      return _meStore.userCan(permissions)
    })
    const labels = _.get(state, 'crudMeta.labels', [])
    return filteredColumns.map(function (column) {
      column.label = labels[column.name]
      return column
    })
  },
  /**
   * Возвращает роут на страницу со списком записей
   * @param state
   * @returns {any}
   */
  getIndexPageRoute: (state) => _.get(state, 'crudMeta.indexPage.route', 'crudMeta_indexPage_route_NOT_SET'),
  /**
   * Возвращает роут на страницу редактирования
   * @param state
   * @returns {any}
   */
  getEditPageRoute: (state) => _.get(state, 'crudMeta.editPage.route', 'crudMeta_editPage_route_NOT_SET'),
  /**
   * Возвращает название ключевого поля. Если не указан "crudMeta.pkField", то будет "id"
   * @param state
   * @returns {String}
   */
  getPkField: (state) => _.get(state, 'crudMeta.pkField', 'id'),
  /**
   * Url для загрузки списка записей. Если не указан listUrl, то путь {crudMeta.baseUrl}/index'
   * @param state
   * @returns {string}
   */
  getListUrl: (state) => _.get(state, 'crudMeta.listUrl', state.crudMeta.baseUrl + '/index'),
  /**
   * Url для загрузки записи. Если не указан loadModelUrl, то путь {crudMeta.baseUrl}/update'
   * @param state
   * @returns {string}
   */
  getLoadModelUrl: (state) => _.get(state, 'crudMeta.loadModelUrl', state.crudMeta.baseUrl + '/update'),
  /**
   * Url для запроса новой записи. Если не указан newModelUrl, то путь {crudMeta.baseUrl}/create'
   * @param state
   * @returns {string}
   */
  getNewModelUrl: (state) => _.get(state, 'crudMeta.newModelUrl', state.crudMeta.baseUrl + '/create'),
  /**
   * Url для сохранения записи. Если не указан saveModelUrl, то путь {crudMeta.baseUrl}/save'
   * @param state
   * @returns {string}
   */
  getSaveModelUrl: (state) => _.get(state, 'crudMeta.saveModelUrl', state.crudMeta.baseUrl + '/save'),
  /**
   * Url для удаления записи. Если не указан deleteModelUrl, то путь {crudMeta.baseUrl}/delete'
   * @param state
   * @returns {string}
   */
  getDeleteModelUrl: (state) => _.get(state, 'crudMeta.deleteModelUrl', state.crudMeta.baseUrl + '/delete'),
}
