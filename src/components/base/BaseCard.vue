<script setup>
import { computed } from 'vue'

const props = defineProps({
  shadow: {
    type: String,
    default: 'md',
    validator: (v) => ['none', 'sm', 'md', 'lg', 'xl'].includes(v),
  },
  bordered: { type: Boolean, default: false },
  compact: { type: Boolean, default: false },
  hover: { type: Boolean, default: false },
})

const shadowClass = computed(
  () =>
    ({
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    })[props.shadow],
)
</script>

<template>
  <div
    :class="[
      'card bg-base-100',
      shadowClass,
      { 'card-bordered border-base-300': bordered },
      { 'card-compact': compact },
      { 'hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer': hover },
    ]"
  >
    <figure v-if="$slots.figure" class="overflow-hidden">
      <slot name="figure" />
    </figure>

    <div class="card-body">
      <slot />
    </div>

    <div v-if="$slots.actions" class="card-actions justify-end px-6 pb-6 pt-0">
      <slot name="actions" />
    </div>
  </div>
</template>
