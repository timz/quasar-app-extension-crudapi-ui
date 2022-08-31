<template>
  <crud-string :label="label" type-val="number" :step="decimal ? 0.01 : 1"></crud-string>
</template>

<script>
import CrudString from "./CrudString"
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CrudNumber',
  components: {CrudString},
  props: {
    value: [String, Number],
    label: String,
    decimal: {
      type: Boolean,
      default: false
    },
  },
})
</script>
