<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import NewsList from '@/features/news/components/NewsList.vue'
import { getArticleById, mockArticles, formatDate } from '@/features/news/mockData.js'

const route = useRoute()
const article = ref(null)
const loading = ref(true)

const formattedDate = computed(() => (article.value ? formatDate(article.value.publishedAt) : ''))

const initials = computed(() =>
  article.value
    ? article.value.author
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : '',
)

const relatedArticles = computed(() =>
  mockArticles.filter((a) => a.id !== article.value?.id).slice(0, 3),
)

function fetchArticle(id) {
  loading.value = true
  // Replace with real API call: GET /articles/:id
  setTimeout(() => {
    article.value = getArticleById(id)
    loading.value = false
  }, 500)
}

onMounted(() => fetchArticle(route.params.id))
watch(
  () => route.params.id,
  (id) => fetchArticle(id),
)
</script>

<template>
  <div>
    <!-- Loading skeleton -->
    <div v-if="loading" class="max-w-3xl mx-auto px-4 py-10 space-y-4 animate-pulse">
      <div class="h-4 bg-base-300 rounded w-1/4" />
      <div class="h-10 bg-base-300 rounded w-full" />
      <div class="h-10 bg-base-300 rounded w-3/4" />
      <div class="h-64 bg-base-300 rounded-xl w-full" />
      <div class="space-y-2 pt-4">
        <div class="h-4 bg-base-300 rounded w-full" />
        <div class="h-4 bg-base-300 rounded w-5/6" />
        <div class="h-4 bg-base-300 rounded w-full" />
        <div class="h-4 bg-base-300 rounded w-2/3" />
      </div>
    </div>

    <!-- 404 state -->
    <div v-else-if="!article" class="max-w-2xl mx-auto px-4 py-24 text-center">
      <p class="font-display font-black text-6xl text-base-300 mb-4">404</p>
      <h1 class="font-display text-2xl font-bold mb-2">Story Not Found</h1>
      <p class="font-body text-base-content/60 mb-6">
        This article may have been removed or the link is incorrect.
      </p>
      <RouterLink to="/news">
        <BaseButton variant="primary">Back to News</BaseButton>
      </RouterLink>
    </div>

    <!-- Article -->
    <article v-else>
      <!-- Hero image -->
      <div class="w-full h-64 md:h-96 overflow-hidden relative bg-base-300">
        <img :src="article.imageUrl" :alt="article.headline" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-linear-to-t from-base-100 via-transparent to-transparent" />
      </div>

      <!-- Body -->
      <div class="max-w-3xl mx-auto px-4 -mt-8 relative z-10">
        <!-- Category + read time -->
        <div class="flex items-center gap-3 mb-4">
          <span
            class="badge bg-accent text-accent-content font-mono text-xs uppercase tracking-wider border-0"
          >
            {{ article.category }}
          </span>
          <span class="dateline">{{ article.readTime }} min read</span>
        </div>

        <!-- Headline -->
        <h1 class="font-display font-black text-3xl md:text-4xl xl:text-5xl leading-tight mb-4">
          {{ article.headline }}
        </h1>

        <!-- Byline -->
        <div class="flex items-center gap-3 ruled-bottom pb-4 mb-6">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-9">
              <span class="font-display font-bold text-sm">{{ initials }}</span>
            </div>
          </div>
          <div>
            <p class="font-body font-semibold text-sm">{{ article.author }}</p>
            <p class="dateline">{{ formattedDate }}</p>
          </div>
          <!-- Share / bookmark -->
          <div class="ml-auto flex gap-2">
            <button class="btn btn-ghost btn-xs font-body gap-1">
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
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
            <button class="btn btn-ghost btn-xs" title="Bookmark">
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
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Article body — replace with real content from API -->
        <div class="prose prose-lg font-body max-w-none text-base-content leading-relaxed">
          <p class="drop-cap">
            {{ article.excerpt }} World leaders gathered in an unprecedented show of multilateral
            cooperation, signing binding commitments that will reshape energy policy across five
            continents. The accord, negotiated over eighteen months, represents the culmination of
            years of diplomatic effort.
          </p>
          <p>
            Scientists and policy experts have praised the agreement, noting that the legally
            binding nature of the targets marks a significant departure from previous voluntary
            frameworks. The deal includes provisions for developed nations to provide financial
            support to emerging economies making the clean energy transition.
          </p>
          <blockquote
            class="border-l-4 border-accent pl-4 italic text-base-content/70 my-6 font-body"
          >
            "This is the moment history will record as the turning point. We came here knowing
            failure was not an option."
            <footer class="text-sm font-semibold not-italic mt-1 text-accent">
              — Summit Chair
            </footer>
          </blockquote>
          <p>
            Implementation will be monitored by a newly established independent body with authority
            to publish annual compliance reports. Nations falling short of interim targets will face
            peer review mechanisms designed to encourage accountability without punitive measures
            that might deter participation.
          </p>
        </div>

        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mt-8 pt-6 ruled-top">
          <span
            v-for="tag in ['Climate', 'Policy', 'World Leaders', 'Sustainability', 'Geneva']"
            :key="tag"
            class="badge badge-outline font-mono text-xs cursor-pointer hover:badge-primary transition-colors"
          >
            #{{ tag }}
          </span>
        </div>

        <!-- Back link -->
        <div class="mt-10 mb-4">
          <RouterLink
            to="/news"
            class="flex items-center gap-1 font-body font-semibold text-sm text-accent hover:underline"
          >
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
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to All Stories
          </RouterLink>
        </div>
      </div>

      <!-- Related articles -->
      <div class="bg-base-200 mt-12 py-12">
        <div class="max-w-7xl mx-auto px-4">
          <SectionTitle
            title="Related Stories"
            eyebrow="More to Read"
            :decorated="true"
            size="md"
          />
          <NewsList :articles="relatedArticles" :loading="false" :columns="3" />
        </div>
      </div>
    </article>
  </div>
</template>
