<template>
  <q-list bordered>
    <q-item-label class="text-blue-grey-4" header>Меню</q-item-label>
    <template v-for="(item) in meStore.menu">
      <q-expansion-item v-if="item.children" :key="item.title" :default-opened="true" :group="item.name"
                        :label="item.title" :to="item.path"
                        expand-separator header-class="text-blue-grey-1" icon="folder">
        <q-list v-if="item.children" bordered :class="menuListColor" dense>
          <q-item v-for="(subItem) in item.children" :key="subItem.title" v-ripple :to="subItem.path"
                  class="text-white"
                  clickable>
            <q-item-section avatar>
              <q-avatar icon="navigate_next"/>
            </q-item-section>
            <q-item-section>{{ subItem.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-item v-else :key="item.title" v-ripple :to="item.path" class="text-white q-pl-sm" clickable dense>
        <q-item-section avatar>
          <q-avatar :icon="item.menuIcon" size="44px"/>
        </q-item-section>
        <q-item-section>{{ item.title }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup>
import {useMeStore} from '@crudapi/stores/me'

const props = defineProps({
  menuListColor: { type: String, default:'bg-blue-grey-9' },
  store: { type: Object },
})

const meStore = useMeStore()
</script>
