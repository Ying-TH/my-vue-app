<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import SectionTitle from '@/components/base/SectionTitle.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import NewsList from '@/components/features/news/NewsList.vue'
import { getNewsList } from '@/features/news/newsService.js'

const router = useRouter()

const articles = ref([])
const loading = ref(true)
const error = ref('')
const activeCategory = ref('All')
const sortOrder = ref('newest')

const categories = ['All', 'Finance', 'HR', 'IT', 'Culture', 'HSE', 'Facilities']

// ── Derived state ──────────────────────────────────────
const filteredArticles = computed(() =>
  activeCategory.value === 'All'
    ? articles.value
    : articles.value.filter((a) => a.category === activeCategory.value),
)

const sortedArticles = computed(() =>
  [...filteredArticles.value].sort((a, b) => {
    const diff = new Date(b.publishedAt) - new Date(a.publishedAt)
    return sortOrder.value === 'oldest' ? -diff : diff
  }),
)

const filteredCount = computed(() => sortedArticles.value.length)

// ── Data loading ───────────────────────────────────────
async function loadArticles() {
  loading.value = true
  error.value = ''
  const { data, error: err } = await getNewsList()
  if (err) {
    error.value = err
  } else {
    articles.value = data
  }
  loading.value = false
}

function setCategory(cat) {
  activeCategory.value = cat
}

function navigateToDetail(article) {
  router.push({ name: 'news-detail', params: { id: article.id } })
}

onMounted(loadArticles)
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">
    <!-- Page header -->
    <div class="flex items-start justify-between mb-6">
      <SectionTitle
        title="Company News"
        eyebrow="Internal Updates"
        subtitle="All announcements, policies, and company updates."
        size="xl"
        tag="h1"
      />
    </div>

    <!-- Controls: category filter + sort -->
    <div class="flex flex-wrap items-center justify-between gap-3 mb-6">
      <div class="flex gap-2 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="[
            'btn btn-sm rounded-full transition-all',
            activeCategory === cat
              ? 'btn-primary'
              : 'btn-ghost border border-base-300 hover:border-primary',
          ]"
          @click="setCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs opacity-50">{{ filteredCount }} articles</span>
        <select v-model="sortOrder" class="select select-bordered select-sm text-sm">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </div>

    <!-- Error banner -->
    <div v-if="error" class="alert alert-error mb-6">
      <span class="text-sm">{{ error }}</span>
      <BaseButton variant="ghost" size="xs" @click="loadArticles">Retry</BaseButton>
    </div>

    <!-- NewsList renders the grid of NewsCards -->
    <NewsList
      :articles="sortedArticles"
      :loading="loading"
      :columns="3"
      :skeleton-count="6"
      @read="navigateToDetail"
    />
  </div>
</template>
