<script setup>
import { ref } from 'vue'

const visible = ref(true)
const message = ref('System maintenance scheduled Saturday 02:00–04:00 UTC. Plan accordingly.')
</script>

<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-3 px-4 text-sm font-medium"
    style="height: var(--announce-height); background: oklch(var(--p)); color: oklch(var(--pc))"
  >
    <div class="flex-1 hidden md:flex items-center">
      <span class="text-xs font-mono uppercase tracking-widest opacity-60">Notice</span>
    </div>

    <div class="flex-2 flex justify-center items-center gap-3 text-center">
      <span class="md:hidden text-[10px] font-mono uppercase tracking-widest opacity-60"
        >Notice</span
      >
      <span class="opacity-90 text-xs md:text-sm truncate">{{ message }}</span>
    </div>

    <div class="flex-1 flex justify-end">
      <button
        class="ml-auto opacity-60 hover:opacity-100 transition-opacity text-lg leading-none"
        aria-label="Dismiss"
        @click="visible = false"
      >
        ×
      </button>
    </div>
  </div>
  <!-- Spacer so layout shifts correctly when bar is hidden -->
  <div v-else style="height: 0" />
</template>
