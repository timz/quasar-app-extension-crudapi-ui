<template>
  <q-dialog v-model="showDialog" persistent>
    <q-card flat style="width: 95%; max-width: 640px">
      <q-toolbar class="bg-blue-grey-8 text-blue-grey-2">
        <q-toolbar-title>{{ dialogTitle }}</q-toolbar-title>
        <q-btn :disable="loading" flat round dense color="white" icon="close" @click="closeDialog"/>
      </q-toolbar>

      <q-card-section class="q-pt-none">
        <q-form greedy @submit="submitModel" class="q-gutter-md">
          <slot name="modal-form"></slot>
          <q-card-actions class="q-pl-none q-pb-none">
            <q-btn :disable="loading" unelevated label="Сохранить" type="submit" color="light-blue-10"></q-btn>
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <q-table ref="crudTbl" dense flat binary-state-sort separator="cell" row-key="name" wrap-cells
           :rows="listItems"
           :columns="store.getIndexPageColumns"
           v-model:pagination="pagination"
           @request="onRequest"
           :filter="store.filterModel"
  >
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot v-if="!['modal-form','filter-form','extra-buttons'].includes(slot)" :name="slot" v-bind="scope || {}"/>
    </template>

    <template v-slot:body-cell-buttons="props">
      <q-td :props="props" style=" width:1%; white-space:nowrap;">

        <slot name="extra-buttons" :props="props"></slot>
        <crud-table-button icon="edit" v-if="store.getUserCanEdit"
                           :to="{ name: store.getEditPageRoute , params: {id: props.row[store.getPkField]}}"
        />

        <q-btn :disable="loading" v-if="store.getUserCanDelete" size="sm" padding="4px 10px" class="del-confirm-btn"
               outline color="pink-5" icon="delete">
          <q-menu anchor="center left" self="center right"
                  class="non-selectable bg-blue-grey-7 text-white q-pa-sm items-center">
            <div class="q-pb-sm text-center">Удалить запись?</div>
            <q-btn size="sm" unelevated color="negative" class="q-mr-sm" label="Удалить" v-close-popup
                   @click="deleteRow(props.row[store.getPkField])"/>
            <q-btn size="sm" unelevated outline color="light" label="Отмена" v-close-popup/>
          </q-menu>
        </q-btn>

      </q-td>
    </template>
  </q-table>
</template>

<script>

import {Notify} from "quasar"

export default {
  name: "CrudTable",
  inject: ['store'],
  props: {
    buttons: {
      type: Array,
      validator: value => {
        if ((value.length === 0)) {
          return true
        }
        const filteredValues = value.filter(val => !['delete', 'edit', 'editModal'].includes(val))
        return filteredValues.length === 0
      },
      // default: () => ['delete', 'edit']
    },
    caption: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {
      dialogTitle: '',
      loading: false,
      showDialog: false,
      listItems: [],
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      }
    }
  },
  methods: {
    loadingOn() {
      this.loading = true
      this.$q.loading.show()
    },
    loadingOff() {
      this.loading = false
      this.$q.loading.hide()
    },
    async submitModel() {
      this.loadingOn()
      const response = await this.store.submitModel()
      if (response.data.status === true) {
        Notify.create({type: 'positive', message: 'Запись успешно сохранена'})
      }
      this.loadingOff()
    },
    async openDialog(id = undefined) {
      this.dialogTitle = id ? this.$route.meta.titleEdit : this.$route.meta.titleNew
      this.loadingOn()
      await this.store.loadModel(id)
      this.loadingOff()
      this.showDialog = true
    },
    closeDialog() {
      this.showDialog = false
      this.fetchData()
    },
    onRequest(props) {
      if (!props) {
        props = {pagination: this.pagination, filter: this.filter}
      }
      this.loadingOn()
      this.$api.post(this.store.getListUrl, props).then((response) => {
        try {
          this.listItems = response.data.content.items
          this.pagination = props.pagination
          this.pagination.rowsNumber = response.data.content.pagination.rowsNumber
        } catch (e) {
          console.warn(e, 'Ошибка при получении списка из ' + this.store.getListUrl)
        }

      }).finally((e) => {
        this.loadingOff()
      })
    },
    async deleteRow(id) {
      const result = await this.store.deleteModel(id)
      if (result.data.status === true) {
        this.$q.notify({type: 'positive', textColor: 'white', message: result.data.content})
        this.fetchData()
      }
    },
    fetchData() {
      this.$refs.crudTbl.requestServerInteraction()
    }
  },
  mounted() {
    this.fetchData()

  },
}
</script>