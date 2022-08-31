<template>
  <q-input hide-bottom-space clearable :dense="dense" :outlined="outlined" :autogrow="typeVal==='textarea'" :suffix="suffix"
           :type="typeVal" reactive-rules ref="input" :value="value"
           :mask="mask" :prefix="prefix"
           :label="label" :rules="rules"
  ></q-input>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CrudString',
  props: {
    rules: {
      type: Array,
      default: () => []
    },
    value: [String, Number],
    label: String,
    mask: String,
    outlined: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    suffix:{
      type: String
    },
    typeVal: {
      type: String,
      validator: function (value) {
        // Значение должно соответствовать одной из этих строк
        return ['email', 'text', 'tel', 'hidden', 'date', 'time', 'textarea', 'password','number'].indexOf(value) !== -1
      }
    },
    prefix: String,
  }
})
</script>
