<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/base/SectionTitle.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import NewsList from '@/features/news/components/NewsList.vue'
import { getTopArticles } from '@/features/news/mockData.js'

const topArticles = ref([])
const loading = ref(true)

onMounted(() => {
  // Simulate async fetch — replace with real API call
  setTimeout(() => {
    topArticles.value = getTopArticles(4)
    loading.value = false
  }, 600)
})
</script>

<template>
  <section class="py-16 bg-base-100">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-end justify-between mb-8">
        <SectionTitle
          title="Latest News"
          eyebrow="Top Stories"
          subtitle="Stay informed with today's most important stories."
          :decorated="true"
          size="lg"
          tag="h2"
        />
        <RouterLink
          to="/news"
          class="hidden md:flex items-center gap-1 font-body font-semibold text-sm text-accent hover:underline whitespace-nowrap mb-8"
        >
          All Stories
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </RouterLink>
      </div>

      <NewsList :articles="topArticles" :loading="loading" :columns="3" :skeleton-count="4" />

      <div class="mt-8 text-center md:hidden">
        <RouterLink to="/news">
          <BaseButton variant="outline" size="md">View All News</BaseButton>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
