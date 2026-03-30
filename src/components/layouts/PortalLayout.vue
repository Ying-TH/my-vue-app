<script setup>
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'
import AnnouncementBar from '@/components/layouts/AnnouncementBar.vue'
import TopBar from '@/components/layouts/TopBar.vue'
import ContextualSidebar from '@/components/layouts/ContextualSidebar.vue'
import { usePortalStore } from '@/stores/portal'
import TheFooter from './TheFooter.vue'

const portal = usePortalStore()
const sidebarOpen = computed(() => portal.sidebarOpen)
// Track whether the announcement bar is visible (mirrors AnnouncementBar internal state)
// For simplicity we default to true; a shared store can sync this later
const announceVisible = ref(true)
</script>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

<template>
  <!--
    PortalLayout — authenticated shell.
    Renders: AnnouncementBar (top strip) → TopBar (fixed) → ContextualSidebar (fixed left) → main content slot
    All portal child routes render inside <RouterView /> in the main area.
  -->
  <div class="min-h-screen" style="background: oklch(var(--b2))">
    <AnnouncementBar />

    <TopBar class="portal-topbar" />

    <div class="flex flex-1 relative">
      <ContextualSidebar class="portal-sidebar" />

      <!-- Main content area -->
      <main
        class="portal-main transition-all duration-200 flex-1"
        :style="{
          marginLeft: sidebarOpen ? 'var(--sidebar-width)' : '56px',
        }"
      >
        <div class="p-4 min-h-[80vh]">
          <RouterView v-slot="{ Component }">
            <Transition name="page" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </div>

        <TheFooter />
      </main>
    </div>
  </div>
</template>
