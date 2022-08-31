<template>
  <q-checkbox dense hide-bottom-space reactive-rules ref="checkbx"
              class="vertical-middle q-pt-sm q-pb-sm q-pl-none q-ml-none" @input="dateChange" :false-value=0
              :true-value=1
              :value="value"
              :label="label" lazy-rules :rules="rules()"/>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CrudCheckbox',
  props: {
    value: [String, Number, Boolean],
    label: String,
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /*      rules (val) {
            if (this.$attrs.hasOwnProperty('required')) {
              return [val => (val === 1 || val === 0) || this.$t('validation.toggle')]
            }
            return [val => (val === 1 || val === 0 || !val) || this.$t('validation.toggle')]
          } */
  },
  methods: {
    validate(...args) {
      return this.$refs.checkbx.validate(...args)
    },
    rules(val) {
      if (this.required) {
        return [val => (val === 1 || val === 0 || val !== null) || this.$t('validation.toggle')]
      } else {
        return [val => (val === 1 || val === 0 || val == null || val === '') || this.$t('validation.toggle')]
      }
    },
    dateChange(value) {
      this.$emit('input', value)
    }
  }
})
</script>
