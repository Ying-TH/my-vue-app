<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  align: {
    type: String,
    default: 'left',
    validator: (v) => ['left', 'center', 'right'].includes(v),
  },
  size: { type: String, default: 'lg', validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v) },
  tag: { type: String, default: 'h2', validator: (v) => ['h1', 'h2', 'h3', 'h4'].includes(v) },
})

const alignClass = computed(
  () => ({ left: 'text-left', center: 'text-center', right: 'text-right' })[props.align],
)
const sizeClass = computed(
  () =>
    ({
      sm: 'text-base md:text-lg',
      md: 'text-lg md:text-xl',
      lg: 'text-xl md:text-2xl',
      xl: 'text-2xl md:text-3xl',
    })[props.size],
)
</script>

<template>
  <div :class="['mb-6', alignClass]">
    <p v-if="eyebrow" class="text-xs font-semibold uppercase tracking-widest opacity-50 mb-1">
      {{ eyebrow }}
    </p>
    <component :is="tag" :class="['font-bold leading-tight', sizeClass]">
      {{ title }}
    </component>
    <p
      v-if="subtitle"
      class="mt-1.5 text-sm opacity-60 leading-relaxed"
      :class="{ 'mx-auto': align === 'center' }"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
