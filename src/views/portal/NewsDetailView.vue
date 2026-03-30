<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import NewsContent from '@/components/features/news/NewsContent.vue'
import NewsList from '@/components/features/news/NewsList.vue'
import { getNewsById, getNewsList } from '@/features/news/newsService.js'

const route = useRoute()
const router = useRouter()

const article = ref(null)
const related = ref([])
const loading = ref(true)
const error = ref('')

// ── Data loading ───────────────────────────────────────
async function loadArticle(id) {
  loading.value = true
  error.value = ''
  article.value = null
  related.value = []

  // 1. Fetch the article by ID from newsService
  const { data, error: err } = await getNewsById(id)

  if (err) {
    error.value = err
    loading.value = false
    return
  }

  article.value = data

  // 2. Fetch related articles (same category, excluding current)
  const { data: allData } = await getNewsList({ category: data.category })
  if (allData) {
    related.value = allData.filter((a) => a.id !== data.id).slice(0, 2)
  }

  loading.value = false
}

function navigateToDetail(a) {
  router.push({ name: 'news-detail', params: { id: a.id } })
}

function handleShare(a) {
  if (navigator.share) {
    navigator.share({ title: a.title, text: a.excerpt, url: window.location.href })
  } else {
    navigator.clipboard.writeText(window.location.href)
  }
}

function handleTagClick(tag) {
  router.push({ name: 'news', query: { category: tag } })
}

onMounted(() => loadArticle(route.params.id))
watch(
  () => route.params.id,
  (id) => id && loadArticle(id),
)
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <!-- Back navigation -->
    <RouterLink
      to="/portal/news"
      class="inline-flex items-center gap-1.5 text-sm opacity-60 hover:opacity-100 mb-6 transition-opacity"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        />
      </svg>
      Back to News
    </RouterLink>

    <!-- Loading skeleton -->
    <div v-if="loading" class="space-y-5 animate-pulse">
      <div class="h-6 bg-base-300 rounded w-1/4" />
      <div class="h-10 bg-base-300 rounded w-full" />
      <div class="h-10 bg-base-300 rounded w-3/4" />
      <div class="h-64 bg-base-300 rounded-2xl w-full" />
      <div class="space-y-3">
        <div class="h-4 bg-base-300 rounded w-full" />
        <div class="h-4 bg-base-300 rounded w-5/6" />
        <div class="h-4 bg-base-300 rounded w-full" />
        <div class="h-4 bg-base-300 rounded w-4/5" />
      </div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="card bg-base-100 shadow-sm">
      <div class="card-body items-center py-20 text-center">
        <p class="text-5xl font-bold opacity-20 mb-4">404</p>
        <p class="font-semibold opacity-60">{{ error }}</p>
        <RouterLink to="/portal/news" class="mt-4">
          <BaseButton variant="primary" size="sm">Back to News</BaseButton>
        </RouterLink>
      </div>
    </div>

    <!--
      NewsContent — receives the full article object.
      Renders: hero image, meta, title, byline, HTML body, tags.
    -->
    <NewsContent
      v-else-if="article"
      :article="article"
      @share="handleShare"
      @tag-click="handleTagClick"
    />

    <!-- Related articles -->
    <template v-if="!loading && !error && related.length">
      <div class="mt-10">
        <SectionTitle title="Related Articles" eyebrow="More Reading" size="md" />
        <NewsList
          :articles="related"
          :loading="false"
          :columns="2"
          :compact="true"
          @read="navigateToDetail"
        />
      </div>
    </template>
  </div>
</template>
