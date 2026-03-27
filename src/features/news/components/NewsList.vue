<script setup>
import { computed } from 'vue'
import NewsCard from '@/features/news/components/NewsCard.vue'

const props = defineProps({
  articles: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  columns: { type: Number, default: 3, validator: (v) => [1, 2, 3, 4].includes(v) },
  skeletonCount: { type: Number, default: 6 },
})

const gridClass = computed(
  () =>
    ({
      1: 'grid grid-cols-1 gap-6',
      2: 'grid grid-cols-1 md:grid-cols-2 gap-6',
      3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
      4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
    })[props.columns],
)
</script>

<template>
  <div>
    <!-- Loading skeletons -->
    <div v-if="loading" :class="gridClass">
      <div
        v-for="n in skeletonCount"
        :key="`sk-${n}`"
        class="card bg-base-100 shadow-md animate-pulse"
      >
        <div class="h-48 bg-base-300 rounded-t-2xl" />
        <div class="card-body gap-3">
          <div class="h-3 bg-base-300 rounded w-1/3" />
          <div class="h-5 bg-base-300 rounded w-full" />
          <div class="h-5 bg-base-300 rounded w-4/5" />
          <div class="h-3 bg-base-300 rounded w-3/4" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!articles || articles.length === 0"
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16 text-base-300 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <p class="font-display font-bold text-2xl text-base-content/40">No stories found</p>
      <p class="font-body text-sm text-base-content/40 mt-1">
        Check back soon for the latest coverage.
      </p>
    </div>

    <!-- Articles -->
    <div v-else :class="gridClass">
      <NewsCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>
