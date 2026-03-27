<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'accent', 'ghost', 'outline', 'neutral'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v),
  },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  type: { type: String, default: 'button' },
})

defineEmits(['click'])

const variantClass = computed(
  () =>
    ({
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      ghost: 'btn-ghost',
      outline: 'btn-outline',
      neutral: 'btn-neutral',
    })[props.variant],
)

const sizeClass = computed(
  () =>
    ({
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: '',
      lg: 'btn-lg',
    })[props.size],
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'btn font-body tracking-wide transition-all duration-200',
      variantClass,
      sizeClass,
      { 'btn-disabled': disabled },
    ]"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="loading loading-spinner loading-xs" />
    <slot />
  </button>
</template>
