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
  decorated: { type: Boolean, default: true },
  tag: { type: String, default: 'h2', validator: (v) => ['h1', 'h2', 'h3', 'h4'].includes(v) },
})

const alignClass = computed(
  () => ({ left: 'text-left', center: 'text-center', right: 'text-right' })[props.align],
)
const accentAlignClass = computed(
  () => ({ left: 'justify-start', center: 'justify-center', right: 'justify-end' })[props.align],
)
const sizeClass = computed(
  () =>
    ({
      sm: 'text-xl md:text-2xl',
      md: 'text-2xl md:text-3xl',
      lg: 'text-3xl md:text-4xl',
      xl: 'text-4xl md:text-5xl lg:text-6xl',
    })[props.size],
)
</script>

<template>
  <div class="['mb-8', alignClass]">
    <div v-if="decorated" class="ruled-top mb-3" />

    <p v-if="eyebrow" class="dateline mb-2">{{ eyebrow }}</p>

    <component :is="tag" class="['font-display font-bold leading-tight', sizeClass]">
      {{ title }}
    </component>

    <p
      v-if="subtitle"
      class="mt-3 font-body text-base-content/70 leading-relaxed max-w-2xl"
      :class="{ 'mx-auto': align === 'center' }"
    >
      {{ subtitle }}
    </p>

    <div v-if="decorated" class="mt-3 flex items-center gap-2" :class="accentAlignClass">
      <div class="h-0.5 w-12 bg-accent" />
      <div class="h-0.5 w-4 bg-secondary" />
    </div>
  </div>
</template>
