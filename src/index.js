/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf (conf) {
  // make sure necessary plugins are injected:
  conf.framework.plugins.push('Dialog')
  conf.framework.cssAddon = true

  // register our boot file
  conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/i18n.js')
  conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/moment.js')
  conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/register.js')
  conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/validators.js')
  conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/unwrapInjectedRef.js')
  conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/axios.js')

  conf.css.push('~quasar-app-extension-crudapi-ui/src/css/app.scss')

  // conf.boot.push('~quasar-app-extension-crudapi-ui/src/boot/helpers.js')



  // make sure app extension files & ui package gets transpiled
  conf.build.transpileDependencies.push(/quasar-app-extension-crudapi-ui[\\/]src/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  // conf.css.push('~quasar-ui-crudapi-ui/src/index.sass')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app-*" CLI
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0')
  }
  else if (api.hasWebpack) {
    api.compatibleWith('@quasar/app-webpack', '^3.4.0')
  }


  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('CrudapiUi', '~quasar-ui-crudapi-ui/src/components/CrudapiUi.json')


  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
