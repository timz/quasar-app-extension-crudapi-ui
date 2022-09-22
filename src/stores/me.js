import {defineStore} from 'pinia'
import {toRaw} from 'vue'
import {axi} from "../boot/axios"
import _ from "lodash"

export function getToken() {
  return localStorage.getItem(process.env.AUTH_TOKEN_NAME)
}
const _getTypeOb = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

function _getChildRoutes(parentRoute, userName, perms, all = false) {
  const rows = _.filter(parentRoute.children, function (row) {
    // Скрываем роуты у которых meta.menuHide == true
    if (row.meta.menuHide === true) {
      return false
    }
    //если суперадмин, то показываем все меню
    if (userName === 'sa') {
      return true
    }
    // для всех остальных если all== true то возвращаем все,
    // иначе - только если имеют доступ
    return all === true ? true : _.intersection(row.meta.permissions, perms).length > 0
  })
  return _.sortBy(rows, ['menuSort', 'title'])
}

export const useMeStore = defineStore('me', {
    state: () => ({
      loaded: false,
      username: 'Гость',
      permissions: [],
      menu: [],
    }),
    actions: {
      userCanRoute(route) {
        //Если это незащищенный роут, то разрешаем
        const freeRoutes = ['home', 'login', 'logout', 'register']
        if (freeRoutes.includes(route.name)) {
          return true
        }
        const routePerms = route.meta.permissions ?? []
        return this.userCan(routePerms)
      },
      userCan(checkPermissions, debug = false) {
        //если суперадмин, то разрешаем
        if (this.username === 'sa') {
          return true
        }
        const userPerms = toRaw(this.permissions)

        const typePermission = _getTypeOb(checkPermissions)
        if (debug===true){
          console.warn(checkPermissions, typePermission)
        }
        switch (typePermission) {
          case 'undefined':
            return true
          case 'array':
            return _.intersection(userPerms, checkPermissions).length > 0
          case 'string':
            return _.intersection(userPerms, [checkPermissions]).length > 0
          default:
            console.warn('Не верное свойство permissions', checkPermissions)
            return false
        }
      },
      setMenu(routes) {
        // Ищем корневой роут
        let rootRoute = _.find(routes, {name: 'root'});

        if (rootRoute === undefined) {
          console.warn('корневой роут не обнаружен')
          return []
        }
        let allRoutes = _.filter(rootRoute.children, function (row) {
          return !row.meta.menuHide === true
        })

        // Маппинг для меню
        let allMenus = _.map(allRoutes, row => {
          return {
            name: row.name,
            path: row.path,
            title: row.meta.menuTitle ?? row.meta.title,
            menuIcon: row.meta.menuIcon ?? 'apps',
            menuSort: row.meta.menuSort ?? 0,
            menuParenName: row.meta.menuParenName,
            permissions: row.meta.permissions
          }
        })
        //Основное дерево меню
        let treeMenu = []
        // Название роутов которые надо убрать из списка
        let exceptMenus = ['home']


        allMenus.forEach(function (menuItem) {
            if (exceptMenus.includes(menuItem.name)) {
              return false
            }
            // Если это корневой элемент, то добавляем в корень treeMenu
            if (menuItem.menuParenName === undefined) {
              // Если его нет, то добавляем
              const parentIndex = _.findIndex(treeMenu, {'name': menuItem.name})
              if (parentIndex === -1) {
                treeMenu.push(menuItem)
              } else {
                // Если есть, то добавляем остальные атрибуты
                treeMenu[parentIndex].title = menuItem.title
                treeMenu[parentIndex].menuSort = menuItem.menuSort
              }
            } else {
              // если это дочерний элемент, то проверяем имеет ли юзер к нему доступ
              // console.warn(menuItem.name, this.userCan(menuItem.permissions))
              if (this.userCan(menuItem.permissions)) {
                // ищем родителя
                let parentIndex = _.findIndex(treeMenu, {'name': menuItem.menuParenName})
                // если родителя нет, то добавляем его сразу с дочерним элементом (родитель без тайтла)
                if (parentIndex === -1) {
                  treeMenu.push({
                    name: menuItem.menuParenName,
                    title: menuItem.menuParenName,
                    menuSort: 0,
                    children: [menuItem]
                  })
                } else {
                  // если родитель есть, то пушим в его чайлды дочерний пункт
                  if (treeMenu[parentIndex].hasOwnProperty('children') === false) {
                    treeMenu[parentIndex].children = []
                  }
                  treeMenu[parentIndex].children.push(menuItem)
                }
              }
            }
          }, this
        )
        // Чистим от пустых родителей
        treeMenu =  _.filter(treeMenu, function (menuItem) {
          return menuItem.hasOwnProperty('children') || menuItem.path !== '#'
        })

        // Сортировка по весу
        treeMenu.forEach(function(parentMenuItem){
          if (parentMenuItem.hasOwnProperty('children')){
            parentMenuItem.children = _.sortBy(parentMenuItem.children,['menuSort', 'title'])
          }
        })


        return treeMenu
      },
      async loadMe(routes) {
        const response = await axi.post('/auth/me', {app: 'app'})
        if (response.data.status === true) {
          this.username = response.data.content.username
          this.permissions = response.data.content.permissions ?? []
          this.menu = this.setMenu(routes)
          this.loaded = true
          return true
        }
        return false
      },
      logout() {
        this.username = 'Гость'
        this.permissions = []
        this.menu = []
        this.loaded = false
        localStorage.removeItem(process.env.AUTH_TOKEN_NAME)
      }
    }
  }
)
