<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl', 'full'].includes(v),
  },
  closeable: { type: Boolean, default: true },
  persistent: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue', 'close'])

// Unique ID for aria-labelledby
const titleId = `modal-title-${Math.random().toString(36).slice(2, 7)}`

const sizeClass = computed(
  () =>
    ({
      sm: 'max-w-sm',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-[95vw] h-[90vh]',
    })[props.size],
)

function close() {
  emit('update:modelValue', false)
  emit('close')
}

function handleBackdropClick() {
  if (props.closeable && !props.persistent) close()
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative {
  transform: scale(0.96) translateY(8px);
}
.modal-leave-to .relative {
  transform: scale(0.96) translateY(4px);
}
</style>

<template>
  <!--
    BaseModal — layout-only popup skeleton.
    Provides the backdrop, panel, header, body, and footer structure.
    All internal content is injected via named slots.

    Props:
      modelValue  — Boolean, controls open/closed state (v-model)
      title       — Optional string shown in the header slot default
      size        — 'sm' | 'md' | 'lg' | 'xl' | 'full'
      closeable   — Boolean, shows the × button and closes on backdrop click
      persistent  — Boolean, prevents closing on backdrop click (overrides closeable)

    Slots:
      default     — Main body content
      header      — Replaces the entire header section
      footer      — Action buttons / footer content
      title       — Override just the title text

    Emits:
      update:modelValue — syncs the open state for v-model
      close             — fired whenever the modal closes
  -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        @click.self="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="handleBackdropClick" />

        <!-- Panel -->
        <div
          :class="[
            'relative flex flex-col bg-base-100 rounded-2xl shadow-2xl w-full overflow-hidden',
            sizeClass,
          ]"
          @click.stop
        >
          <!-- ── Header ──────────────────────────────── -->
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-base-300 shrink-0"
          >
            <slot name="header">
              <div :id="titleId">
                <slot name="title">
                  <h3 v-if="title" class="font-semibold text-base">{{ title }}</h3>
                </slot>
              </div>
            </slot>

            <!-- Close button -->
            <button
              v-if="closeable"
              class="btn btn-ghost btn-xs btn-square ml-3 shrink-0 opacity-60 hover:opacity-100"
              aria-label="Close modal"
              @click="close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- ── Body ───────────────────────────────── -->
          <div class="flex-1 overflow-y-auto px-6 py-5">
            <slot />
          </div>

          <!-- ── Footer ─────────────────────────────── -->
          <div
            v-if="$slots.footer"
            class="flex items-center justify-end gap-3 px-6 py-4 border-t border-base-300 shrink-0 bg-base-200/50"
          >
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
