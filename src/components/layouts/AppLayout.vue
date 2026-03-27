<script setup>
import TheNavbar from '@/components/layouts/TheNavbar.vue'
import TheFooter from '@/components/layouts/TheFooter.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <TheNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
