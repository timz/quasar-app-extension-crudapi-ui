<template>
    <div class="bg-blue-grey-1">
      <slot name="buttonsBar"></slot>
    </div>
    <div class="q-pa-xs" style="border: #eceff1 thin solid; border-top: none">
      <slot></slot>
    </div>
</template>

<script setup>
import ButtonInBar from "../buttons/CrudButtonInBar"

const name = 'CrudEditTab'
const props = defineProps({
  tab: Object
})
</script>
