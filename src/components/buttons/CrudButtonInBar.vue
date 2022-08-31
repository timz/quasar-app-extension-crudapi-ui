<template>
  <q-btn flat stretch :color="color" :label="label" :icon="icon" @click="$emit('clickBtn')"/>
</template>

<script>
export default {
  name: 'CrudButtonInBar',
  props: {
    label: String,
    icon: String,
    color: {
      type: String,
      default: 'secondary'
    }
  }
}
</script>
