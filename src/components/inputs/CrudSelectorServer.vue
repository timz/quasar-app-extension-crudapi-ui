<template>
  <q-select :dense="dense" :outlined="outlined" hide-bottom-space ref="selector" clearable map-options emit-value
            use-input hide-selected
            :fill-input="vl !== null"
            :rules="rules" reactive-rules
            :options="options" :model-value="vl"
            @input="onChanged"
            @filter="filterFn">
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          Ничего не найдено
        </q-item-section>
      </q-item>
    </template>
    <q-inner-loading :showing="disable" color="blue-grey-3"/>
  </q-select>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CrudSelectorServer',
  props: {
    value: [String, Number],
    dataSource: String,
    rules: {
      type: Array,
      default: () => []
    },
    outlined: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
  },
  data: function () {
    return {
      disable: false,
      options: []
    }
  },
  computed: {
    vl() {
      if (this.value) {
        this.getList()
      }
      return this.value
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    onChanged(e) {
      this.$emit('update:model-value', e)
    },
    validate(...args) {
      return this.$refs.selector.validate(...args)
    },
    async getList(filterStr = '') {
      try {
        this.disable = true
        const response = await this.$axios.post(this.dataSource, {
          filterStr: filterStr,
          id: this.value
        })
        if (response) this.options = response.data.content
        this.disable = false
        this.$emit('afterListUpdate', response.data.content)
      } catch (e) {
        console.error('Ошибка при получении списка: "' + this.label + '"', e)
        this.disable = false
      }
    },
    async filterFn(val, update, abort) {
      update(async () => {
        if (val !== '') {
          await this.getList(val)
        }
      })
    }
  }
})
</script>
