<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { usePortalStore } from '@/stores/portal'

const portal = usePortalStore()

const activeCategory = computed(() => portal.activeCategory)
const sidebarOpen = computed(() => portal.sidebarOpen)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
  <!--
    ContextualSidebar — dynamic side menu.
    Content is driven entirely by the activeCategory from portalStore.
    Collapses to icon-only on mobile.
  -->
  <aside
    class="portal-sidebar flex flex-col border-r"
    style="background: oklch(var(--b1)); border-color: oklch(var(--b3))"
    :style="{ width: sidebarOpen ? 'var(--sidebar-width)' : '56px' }"
  >
    <!-- Category heading -->
    <div
      class="flex items-center justify-between px-3 py-3 border-b"
      style="border-color: oklch(var(--b3))"
    >
      <Transition name="fade">
        <span
          v-if="sidebarOpen && activeCategory"
          class="text-xs font-semibold uppercase tracking-widest opacity-50 truncate"
        >
          {{ activeCategory.label }}
        </span>
      </Transition>
      <button
        class="btn btn-ghost btn-xs btn-square ml-auto shrink-0"
        :title="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
        @click="portal.toggleSidebar()"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            :d="sidebarOpen ? 'M11 19l-7-7 7-7' : 'M13 5l7 7-7 7'"
          />
        </svg>
      </button>
    </div>

    <!-- Nav items -->
    <nav class="flex-1 p-2 space-y-0.5 overflow-y-auto">
      <RouterLink
        v-for="item in activeCategory?.sidebar || []"
        :key="item.id"
        :to="item.path"
        custom
        v-slot="{ isActive, navigate }"
      >
        <button
          :class="['sidebar-item w-full text-left', { active: isActive }]"
          :title="!sidebarOpen ? item.label : ''"
          @click="navigate"
        >
          <span :class="['mdi', item.icon, 'text-base leading-none shrink-0']"></span>
          <Transition name="fade">
            <span v-if="sidebarOpen" class="truncate ml-2">{{ item.label }}</span>
          </Transition>
        </button>
      </RouterLink>
    </nav>

    <!-- Bottom: Storage indicator (example widget) -->
    <div v-if="sidebarOpen" class="p-3 border-t" style="border-color: oklch(var(--b3))">
      <p class="text-xs opacity-50 mb-1.5">Storage</p>
      <div class="w-full h-1.5 rounded-full bg-base-300">
        <div class="h-full rounded-full bg-secondary" style="width: 38%" />
      </div>
      <p class="text-xs opacity-40 mt-1">7.6 GB of 20 GB used</p>
    </div>
  </aside>
</template>
