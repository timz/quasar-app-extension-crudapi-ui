<template>
  <q-list bordered>
    <q-item-label header class="text-blue-grey-4">Меню</q-item-label>
    <template v-for="(item) in meStore.menu">
      <q-expansion-item header-class="text-blue-grey-1" :group="item.name" v-if="item.children" expand-separator
                        icon="folder" :label="item.title"
                        :key="item.title" :default-opened="true" :to="item.path">
        <q-list v-if="item.children" dense bordered class="bg-blue-grey-9">
          <q-item class="text-white" v-for="(subItem) in item.children" :key="subItem.title" :to="subItem.path"
                  clickable
                  v-ripple>
            <q-item-section avatar>
              <q-avatar icon="navigate_next"/>
            </q-item-section>
            <q-item-section>{{ subItem.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-item dense v-else class="text-white q-pl-sm" :key="item.title" :to="item.path" clickable v-ripple>
        <q-item-section avatar>
          <q-avatar size="44px" :icon="item.menuIcon"/>
        </q-item-section>
        <q-item-section>{{ item.title }}</q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script setup>
import {useMeStore} from '@crudapi/stores/me'

const meStore = useMeStore()
</script>
