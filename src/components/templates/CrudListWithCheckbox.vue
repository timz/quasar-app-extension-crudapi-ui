<template>
  <q-list separator dense>
    <q-item v-if="listOptions.length === 0" tag="label" dense>
      <q-item-section>
        <q-item-label>
          <q-icon name="warning"/>
          Совпадений не найдено
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="item in listOptions" :key="item.name" tag="label" clickable v-ripple>
      <q-item-section side>
        <q-checkbox v-model="item.value" @click="sendChangedValue(item.name,item.value)"/>
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ item.name }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {api} from "boot/axios"
import {useRoute} from 'vue-router'

const name = "CrudListWithCheckbox"
const listOptions = ref([])
const currentRoute = useRoute()

async function sendChangedValue(name, value) {
  try {
    let url = (value === true) ? '/route/assign-permission-route' : '/route/revoke-permission-route'
    await api.post(url, { 'parent': currentRoute.params.id, 'child': name})
    await updateItems()
  } catch (error) {
    console.warn(error, 'Ошибка при обновлении маршрутов')
  }
}

async function updateItems() {
  try {
    let result = await api.post('/route/routes-by-permission/' + currentRoute.params.id)
    listOptions.value = result.data.content
  } catch (error) {
    console.warn(error, 'Ошибка при обновлении маршрутов')
  }
}

onMounted(() => {
  updateItems()
})
</script>
