<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 q-mb-md q-pr-md">
        <h5 class="q-mt-sm q-mb-lg">
          {{ titlePage ?? 'Заголовок страницы не указан в router.meta.titleEdit/titleNew' }}
        </h5>
        <q-form ref="editForm" greedy @submit="submitModel">
          <div class="row q-col-gutter-sm">
            <slot></slot>
          </div>
          <div class="row q-gutter-sm">
            <q-btn class="q-mt-md" outline
                   icon="navigate_before"
                   label="Назад к списку" color="secondary" @click="$router.push({ name: store.getIndexPageRoute})"></q-btn>
            <q-space/>
            <q-btn class="q-mt-md" outline
                   icon="restart_alt"
                   label="Сбросить" color="secondary" @click="loadModel"></q-btn>
            <q-btn class="q-mt-md" unelevated
                   icon="save"
                   :label="store.editModel._forceSave===true?'Перезаписать':'Сохранить'"
                   type="submit" color="secondary"></q-btn>
          </div>


        </q-form>
      </div>
      <div v-if="$route.params.id" class="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 q-mb-md">
        <q-tabs v-model="tab" active-color="blue-grey-1" class="bg-blue-grey-7 text-blue-grey-3"
                indicator-color="transparent"
                align="left"
                dense narrow-indicator>
          <template v-for="item in tabs" v-bind:key="item.name">
            <div class="q-pa-xs">
              <q-tab :name="item.name" :label="item.label"></q-tab>
            </div>
          </template>
        </q-tabs>
        <q-tab-panels v-model="tab" animated transition-duration="200">
          <q-tab-panel v-for="item in tabs" v-bind:key="item.name" :name="item.name" class="q-pa-none">
            <component :is="item.tab"></component>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue'
import {Notify, useQuasar} from 'quasar'
import {useRoute} from 'vue-router'

const name = 'CrudEditCard'
const $q = useQuasar()
const tab = ref((props.tabs && props.tabs[0]['name']) ? props.tabs[0]['name'] : 'default')

const editForm = ref(null);

const props = defineProps({
  tabs: Array,
  store: Object
})

const currentRoute = useRoute()
const titlePage = currentRoute.params.id ? currentRoute.meta.titleEdit : currentRoute.meta.titleNew

const loadModel = async () => {
  $q.loading.show()
  props.store.resetModel()
  await nextTick()
  editForm.value.resetValidation()
  await props.store.loadModel(currentRoute.params.id)
  editForm.value.resetValidation()
  $q.loading.hide()
}

const submitModel = async () => {
  $q.loading.show()
  const response = await props.store.submitModel()
  if (response.data.status === true) {
    Notify.create({type: 'positive', message: 'Запись успешно сохранена'})
  }
  $q.loading.hide()
}

onMounted(async () => {
  await loadModel()
})
</script>

