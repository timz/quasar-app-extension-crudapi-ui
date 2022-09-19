import { boot } from 'quasar/wrappers'
import CrudButtonInBar from '../components/buttons/CrudButtonInBar'
import CrudTableButton from '../components/buttons/CrudTableButton'

import CrudEditCard from '../components/templates/CrudEditCard'
import CrudEditTab from '../components/templates/CrudEditTab'
import CrudIndexCard from '../components/templates/CrudIndexCard'
import CrudListWithCheckbox from '../components/templates/CrudListWithCheckbox'
import CrudTable from '../components/templates/CrudTable'

import CrudString from '../components/inputs/CrudString'
import CrudCheckbox from '../components/inputs/CrudCheckbox'
import CrudDateTime from '../components/inputs/CrudDateTime'
import CrudDate from '../components/inputs/CrudDate'
import CrudTime from '../components/inputs/CrudTime'
import CrudMobile from '../components/inputs/CrudMobile'
import CrudNumber from '../components/inputs/CrudNumber'
import CrudToggle from '../components/inputs/CrudToggle'
import CrudSelectorClient from '../components/inputs/CrudSelectorClient'
import CrudSelectorServer from '../components/inputs/CrudSelectorServer'

export default boot(({ app }) => {
  app.component(CrudButtonInBar.name, CrudButtonInBar)
  app.component(CrudTableButton.name, CrudTableButton)
  app.component('CrudEditCard', CrudEditCard)
  app.component('CrudEditTab', CrudEditTab)
  app.component(CrudIndexCard.name, CrudIndexCard)
  app.component('CrudListWithCheckbox', CrudListWithCheckbox)
  app.component('CrudTable', CrudTable)

  app.component(CrudString.name, CrudString)
  app.component(CrudCheckbox.name, CrudCheckbox)
  app.component(CrudDateTime.name, CrudDateTime)
  app.component(CrudDate.name, CrudDate)
  app.component(CrudTime.name, CrudTime)
  app.component(CrudMobile.name, CrudMobile)
  app.component(CrudNumber.name, CrudNumber)
  app.component(CrudToggle.name, CrudToggle)
  app.component(CrudSelectorClient.name, CrudSelectorClient)
  app.component(CrudSelectorServer.name, CrudSelectorServer)
})
