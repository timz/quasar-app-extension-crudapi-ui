import { boot } from 'quasar/wrappers'
// Временная затычка, чтоб убрать ворнинги
export default boot(({ app }) => {
  // injected property "selectedMods" is a ref and will be auto-unwrapped and no longer needs `.value` in the next minor release.
  // To opt-in to the new behavior now, set `app.config.unwrapInjectedRef = true` (this config is temporary and will not be needed in the future.)
  app.config.unwrapInjectedRef = true
});
