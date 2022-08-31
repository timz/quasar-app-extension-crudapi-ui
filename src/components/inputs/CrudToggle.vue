<template>
  <q-toggle hide-bottom-space class="q-pt-sm q-pb-sm" @input="dateChange" :false-value=0 :true-value=1 left-label
            :value="value"
            :label="label" lazy-rules :rules="rules"/>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CrudToggle',
  props: [
    'value',
    'label',
    'required'
  ],
  computed: {
    rules(val) {
      if (this.required) {
        return [val => (val === 1 || val === 0) || this.$t('validation.toggle')]
      }
      return [val => (val === 1 || val === 0 || !val) || this.$t('validation.toggle')]
    }
  },
  methods: {
    dateChange(value) {
      this.$emit('input', value)
    }
  }
})
</script>
