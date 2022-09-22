<template>
  <q-input ref="field" :model-value="displayValue" :dense="dense" :outlined="outlined" :label="label" reactive-rules
           lazy-rules :rules="rules">
    <template #append>
      <q-btn dense unelevated outline color="secondary" icon="event">
        <q-popup-proxy ref="qDateProxy">
          <q-date minimal :model-value="value" @update:model-value="onUpdateValue" :mask="valueFormat"
                  emit-immediately>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Закрыть" color="primary" flat/>
            </div>
          </q-date>
        </q-popup-proxy>
      </q-btn>
    </template>
  </q-input>
</template>

<script>
import {useFormChild, date} from 'quasar'
import {i18n} from '../../boot/i18n'
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CrudDate",
  inheritAttrs: false,
  props: {
    rules: {
      type: Array,
      default: () => []
    },
    modelValue: String,
    label: String,
    outlined: {
      type: Boolean,
      default: true
    },
    dense: {
      type: Boolean,
      default: true
    },
    customDisplayFormat: {
      type: String
    },
    customValueFormat: {
      type: String
    }

  },
  data: () => ({
    value: null
  }),
  computed: {
    valueFormat() {
      //Если в базе data поле хранится экзотически, то берем эту маску:
      // if (this.customValueFormat) {
      //   return this.customValueFormat
      // }
      return this.customValueFormat ?? 'YYYY-MM-DD'
    },
    displayValue() {
      // let mask = i18n.global.t('maskLocaleDate')
      // if (this.customDisplayFormat) {
      //   mask = this.customDisplayFormat
      // }
      let mask = this.customDisplayFormat ?? i18n.global.t('maskLocaleDate')
      if (this.modelValue){
        const dateObj = date.extractDate(this.modelValue, 'YYYY-MM-DD')
        return date.formatDate(dateObj, mask)
      }
      return undefined

    }
  },
  mounted() {
    useFormChild({validate: this.validate, resetValidation: this.resetValidation, requiresQForm: true})
    this.value = this.modelValue
  },
  methods: {
    onUpdateValue(value, reason, details) {
      this.value = value
      this.$emit('update:model-value', value);
    },
    validate(...args) {
      return this.$refs.field.validate(this.modelValue)
    },
    resetValidation() {
      // console.warn('resetValidation')
    }
  }
})
</script>
