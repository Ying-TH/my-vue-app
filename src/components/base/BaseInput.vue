<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  size: { type: String, default: 'md', validator: (v) => ['xs', 'sm', 'md', 'lg'].includes(v) },
  variant: {
    type: String,
    default: 'bordered',
    validator: (v) => ['default', 'bordered', 'ghost'].includes(v),
  },
  error: { type: String, default: '' },
  hint: { type: String, default: '' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

defineEmits(['update:modelValue', 'blur', 'focus'])

const variantClass = computed(
  () =>
    ({
      default: '',
      bordered: 'input-bordered',
      ghost: 'input-ghost',
    })[props.variant],
)

const sizeClass = computed(
  () =>
    ({
      xs: 'input-xs',
      sm: 'input-sm',
      md: '',
      lg: 'input-lg',
    })[props.size],
)
</script>

<template>
  <div class="form-control w-full">
    <label v-if="label" class="label pb-1">
      <span class="label-text font-body font-semiblod">
        {{ label }}
        <span v-if="required" class="text-accent ml-0.5">*</span>
      </span>
    </label>

    <input
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :class="['input w-full font-body', variantClass, sizeClass, { 'input-error': error }]"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />

    <label v-if="error || hint" class="label pt-1">
      <span v-if="error" class="label-text-alt text-error">{{ error }}</span>
      <span v-else-if="hint" class="label-text-alt text-base-content/60">{{ hint }}</span>
    </label>
  </div>
</template>
