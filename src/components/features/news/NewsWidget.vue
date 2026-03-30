<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import SectionTitle from '@/components/base/SectionTitle.vue'
import { getLatestNews, formatDate } from '@/features/news/newsService.js'

const props = defineProps({
  limit: { type: Number, default: 4 },
  title: { type: String, default: 'Latest News' },
})

const articles = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  const { data, error: err } = await getLatestNews(props.limit)
  if (err) {
    error.value = err
  } else {
    articles.value = data
  }
  loading.value = false
})
</script>

<template>
  <!--
    NewsWidget — Horizontal News Card Grid.
    Fetches the latest N articles via newsService.getLatestNews().
    Displays cards in a responsive horizontal grid: thumbnail on the left,
    title + meta on the right. No excerpt/body to keep the widget compact.
    "View All" routes to NewsView; each card routes to NewsDetailView.

    Props:
      limit — number of cards to display (default 4)
      title — widget heading (default "Latest News")
  -->
  <div class="card bg-base-100 shadow-sm">
    <div class="card-body p-5 md:p-6">
      <!-- ── Widget header ─────────────────────────────── -->
      <div class="flex items-center justify-between mb-5">
        <SectionTitle :title="title" eyebrow="Company Updates" size="md" tag="h2" class="mb-0" />
        <RouterLink
          to="/portal/news"
          class="btn btn-ghost btn-sm gap-1.5 shrink-0 font-medium"
          style="color: oklch(var(--s))"
        >
          View All
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </RouterLink>
      </div>

      <!-- ── Error state ───────────────────────────────── -->
      <div v-if="error" class="alert alert-error py-2.5 text-sm">
        <svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
        {{ error }}
      </div>

      <!-- ── Loading skeletons — horizontal card grid ──── -->
      <div v-else-if="loading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          v-for="n in limit"
          :key="n"
          class="flex flex-col rounded-xl overflow-hidden border border-base-300 animate-pulse"
        >
          <!-- Thumbnail skeleton -->
          <div class="h-36 bg-base-300 w-full shrink-0" />
          <!-- Text skeleton -->
          <div class="flex flex-col gap-2 p-3 flex-1">
            <div class="h-2.5 bg-base-300 rounded w-1/3" />
            <div class="h-3.5 bg-base-300 rounded w-full" />
            <div class="h-3.5 bg-base-300 rounded w-4/5" />
            <div class="h-2.5 bg-base-300 rounded w-1/4 mt-auto pt-1" />
          </div>
        </div>
      </div>

      <!-- ── Horizontal card grid ──────────────────────── -->
      <div
        v-else-if="articles.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
      >
        <RouterLink
          v-for="article in articles"
          :key="article.id"
          :to="`/portal/news/${article.id}`"
          class="group flex flex-col rounded-xl overflow-hidden border border-base-300 hover:border-primary hover:shadow-md transition-all duration-200"
        >
          <!-- Thumbnail -->
          <div class="relative h-36 overflow-hidden bg-base-300 shrink-0">
            <img
              :src="article.thumbnailUrl || article.imageUrl"
              :alt="article.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <!-- Category badge -->
            <span
              class="absolute top-2 left-2 badge badge-sm font-mono uppercase tracking-wide border-0"
              style="background: oklch(var(--p) / 0.85); color: oklch(var(--pc))"
            >
              {{ article.category }}
            </span>
            <!-- Pinned indicator -->
            <span
              v-if="article.pinned"
              class="absolute top-2 right-2 badge badge-sm badge-accent border-0"
            >
              Pinned
            </span>
          </div>

          <!-- Card body: title + meta (no excerpt) -->
          <div class="flex flex-col gap-1.5 p-3 flex-1">
            <!-- Title -->
            <p
              class="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-secondary transition-colors"
            >
              {{ article.title }}
            </p>

            <!-- Spacer pushes meta to the bottom -->
            <div class="flex-1" />

            <!-- Meta row: author · date · read time -->
            <div class="flex items-center gap-1.5 text-xs opacity-50 flex-wrap">
              <span>{{ article.author }}</span>
              <span>·</span>
              <span>{{ formatDate(article.publishedAt) }}</span>
              <span>·</span>
              <span>{{ article.readTime }} min</span>
            </div>
          </div>
        </RouterLink>
      </div>

      <!-- ── Empty state ───────────────────────────────── -->
      <div v-else class="flex flex-col items-center justify-center py-12 opacity-40">
        <svg class="w-10 h-10 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
        <p class="text-sm font-medium">No news articles yet</p>
      </div>
    </div>
  </div>
</template>
