<template>
  <q-input :outlined="outlined" hide-bottom-space mask="##########" clearable reactive-rules ref="input" :value="value"
           prefix="+7"
           @input="value => $emit('input', value)"
           :label="label" :rules="allRules"
  ></q-input>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CrudMobile',
  props: {
    value: [String, Number],
    label: String,
    required: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    allRules(val) {
      const rules = []
      if (this.required) {
        rules.push(this.$validators.stringRequired(val))
      }
      rules.push(this.$validators.stringFixLength(val, 10))
      return rules
    }
  },
  methods: {
    validate(...args) {
      return this.$refs.input.validate(...args)
    }
  }
})
</script>
