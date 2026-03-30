<script setup>
import { computed } from 'vue'
import NewsCard from './NewsCard.vue'

const props = defineProps({
  articles: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  columns: { type: Number, default: 3, validator: (v) => [1, 2, 3, 4].includes(v) },
  compact: { type: Boolean, default: false },
  skeletonCount: { type: Number, default: 6 },
})

defineEmits(['read'])

const gridClass = computed(
  () =>
    ({
      1: 'grid grid-cols-1 gap-5',
      2: 'grid grid-cols-1 md:grid-cols-2 gap-5',
      3: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',
      4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5',
    })[props.columns],
)
</script>

<template>
  <!--
    NewsList — manages the layout of multiple NewsCard components.
    Handles loading skeletons, empty state, and column layout.

    Props:
      articles      — Array of article objects
      loading       — Boolean, shows skeleton placeholders
      columns       — 1 | 2 | 3 | 4
      compact       — passed through to each NewsCard
      skeletonCount — number of skeletons to show while loading

    Emits:
      read(article) — bubbled up from each NewsCard
  -->
  <div>
    <!-- Skeleton grid -->
    <div v-if="loading" :class="gridClass">
      <div
        v-for="n in skeletonCount"
        :key="`sk-${n}`"
        class="card bg-base-100 shadow-sm animate-pulse overflow-hidden"
      >
        <div class="h-44 bg-base-300" />
        <div class="card-body gap-3 p-4">
          <div class="flex gap-2">
            <div class="h-3 bg-base-300 rounded w-1/4" />
            <div class="h-3 bg-base-300 rounded w-1/4" />
          </div>
          <div class="h-4 bg-base-300 rounded w-full" />
          <div class="h-4 bg-base-300 rounded w-3/4" />
          <div class="h-3 bg-base-300 rounded w-full" />
          <div class="h-3 bg-base-300 rounded w-2/3" />
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-else-if="!articles || articles.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <svg class="w-14 h-14 opacity-20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
      <p class="font-semibold opacity-40">No articles found</p>
      <p class="text-sm opacity-30 mt-1">Check back soon for the latest updates.</p>
    </div>

    <!-- Article grid -->
    <div v-else :class="gridClass">
      <NewsCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        :compact="compact"
        @read="$emit('read', $event)"
      />
    </div>
  </div>
</template>
