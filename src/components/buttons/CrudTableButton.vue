<template>
  <q-btn :to="to" size="sm" padding="4px 10px" class="q-mr-xs" unelevated outline :color="color" :label="label"
         :icon="icon"
         @click="$emit('clickBtn')"></q-btn>
</template>

<script>
export default {
  name: 'CrudTableButton',
  props: {
    label: String,
    icon: {
      type: String,
      default: 'more_horiz'
    },
    color: {
      type: String,
      default: 'secondary'
    },
    to: Object
  }
}
</script>
