<script setup>
import { ref, computed, onMounted } from 'vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import NewsList from '@/features/news/components/NewsList.vue'
import { mockArticles } from '@/features/news/mockData.js'

const articles = ref([])
const loading = ref(true)
const activeCategory = ref('All')
const sortOrder = ref('newest')

const categories = ['All', 'World', 'Technology', 'Science', 'Business', 'Culture', 'Politics']

const filteredArticles = computed(() => {
  let list =
    activeCategory.value === 'All'
      ? articles.value
      : articles.value.filter((a) => a.category === activeCategory.value)

  return sortOrder.value === 'oldest'
    ? [...list].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt))
    : [...list].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
})

onMounted(() => {
  // Simulate async fetch — replace with real API call: GET /articles
  setTimeout(() => {
    articles.value = mockArticles
    loading.value = false
  }, 700)
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-10">
    <!-- Page header -->
    <SectionTitle
      title="All Stories"
      eyebrow="The Archive"
      subtitle="Browse our complete coverage — every story, searchable and sorted."
      :decorated="true"
      size="xl"
      tag="h1"
    />

    <!-- Category filter tabs -->
    <div class="flex gap-2 flex-wrap ruled-bottom pb-4 mb-6">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="[
          'btn btn-sm font-body font-semibold rounded-full transition-all',
          activeCategory === cat
            ? 'btn-primary'
            : 'btn-ghost border border-base-300 hover:border-primary',
        ]"
        @click="activeCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Count + sort -->
    <div class="flex justify-between items-center mb-6">
      <p class="dateline">
        {{ filteredArticles.length }} {{ filteredArticles.length === 1 ? 'story' : 'stories' }}
        <template v-if="activeCategory !== 'All'"> in {{ activeCategory }}</template>
      </p>
      <select v-model="sortOrder" class="select select-bordered select-sm font-body text-sm">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>

    <!-- Article grid -->
    <NewsList :articles="filteredArticles" :loading="loading" :columns="3" :skeleton-count="6" />

    <!-- Pagination (static — wire to API) -->
    <div v-if="!loading && filteredArticles.length > 0" class="flex justify-center mt-12">
      <div class="join">
        <button class="join-item btn btn-sm btn-outline font-body">«</button>
        <button class="join-item btn btn-sm btn-primary font-body">1</button>
        <button class="join-item btn btn-sm btn-outline font-body">2</button>
        <button class="join-item btn btn-sm btn-outline font-body">3</button>
        <button class="join-item btn btn-sm btn-outline font-body">»</button>
      </div>
    </div>
  </div>
</template>
