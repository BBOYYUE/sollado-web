<script setup>
import { computed, watch, ref, onMounted } from "vue";
const props = defineProps({
  size: String,
  marign: String,
  padding: String,
  bgColor: String
})
const sizeClass = computed(() => {

  let c = ""
  console.log(props.marign != 'none')
  switch (props.size) {
    case 'xs':
      c = props.marign != 'none' ? c + ' m-2 ' : c + ''
      c = props.padding != 'none' ? c + ' p-2 ' : c + ''
      break
    case "sm":
      c = props.marign != 'none' ? c + ' m-3 ' : c + ''
      c = props.padding != 'none' ? c + ' p-3 ' : c + ''
      break
    case 'md':
      c = props.marign != 'none' ? c + ' m-4 ' : c + ''
      c = props.padding != 'none' ? c + ' p-4 ' : c + ''
      break
    case 'lg':
      c = props.marign != 'none' ? c + ' m-5 ' : c + ''
      c = props.padding != 'none' ? c + ' p-5 ' : c + ''
      break
    default:
      c = props.marign != 'none' ? c + ' m-6 ' : c + ''
      c = props.padding != 'none' ? c + ' p-6 ' : c + ''
      break
  }
  if (props.bgColor) {
    c = c + ' ' + props.bgColor + ' '
  }
  c = props?.bgColor ? c + ' ' + props.bgColor + ' ' : c + ' bg-white '
  return c

})
</script>
<template>
  <div class="w-full">
    <div class="border border-solid border-gray-100 shadow-md rounded-md" :class="sizeClass">
      <slot></slot>
    </div>
  </div>
</template>