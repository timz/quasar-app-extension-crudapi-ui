<template>
  <q-select :dense="dense" :outlined="outlined" hide-bottom-space reactive-rules ref="selector"
            clearable map-options emit-value :fill-input="value !== null"
            :label="label" :rules="rules"
            :options="options" :value="value"
            @input="valueChanged">
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
  name: 'CrudSelectorClient',
  props: {
    value: [String, Number],
    label: String,
    dataSource: [String, Array],
    requestParams: Array,
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
    }
  },
  data: function () {
    return {
      disable: true,
      options: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    validate(...args) {
      return this.$refs.selector.validate(...args)
    },
    valueChanged($event) {
      this.$emit('update:model-value', $event)
    },
    async getList(filterStr = '') {
      // ждем следующего тика, тк не успевает обновиться this.dataSource
      // при каскадном обновлении селекторов
      await this.$nextTick()

      try {
        if (Array.isArray(this.dataSource)) {
          this.options = this.dataSource
        } else {
          this.disable = true
          const response = await this.$axios.post(this.dataSource, {
            filterStr: filterStr
          })
          if (response) this.options = response.data.content
          this.$emit('afterListUpdate', response.data.content)
        }

      } catch (e) {
        console.error('Ошибка при получении списка: "' + this.label + '"', e)
      }
      this.disable = false
    }
  }
})
</script>
