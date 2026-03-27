<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { formatDate } from '@/features/news/mockData.js'

const props = defineProps({
  article: { type: Object, required: true },
  featured: { type: Boolean, default: false },
})

const router = useRouter()
const formattedDate = computed(() => formatDate(props.article.publishedAt))

function navigateToArticle() {
  router.push({ name: 'news-detail', params: { id: props.article.id } })
}
</script>

<template>
  <BaseCard :hover="true" shadow="md" class="h-full group" @click="navigateToArticle">
    <template #figure>
      <div :class="['relative w-full overflow-hidden', featured ? 'h-64 md:h-80' : 'h-48']">
        <img
          :src="article.imageUrl"
          :alt="article.headline"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span
          class="absolute top-3 left-3 badge bg-accent text-accent-content font-mono text-xs uppercase tracking-wider border-0"
        >
          {{ article.category }}
        </span>
      </div>
    </template>

    <div class="flex flex-col gap-2 flex-1">
      <!-- Meta -->
      <div class="flex items-center gap-2 flex-wrap">
        <span class="dateline">{{ article.author }}</span>
        <span class="text-base-content/30 text-xs">·</span>
        <span class="dateline">{{ formattedDate }}</span>
        <span class="text-base-content/30 text-xs">·</span>
        <span class="dateline">{{ article.readTime }} min</span>
      </div>

      <!-- Headline -->
      <h3
        :class="[
          'font-display font-bold leading-tight text-base-content group-hover:text-accent transition-colors',
          featured ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl',
        ]"
      >
        {{ article.headline }}
      </h3>

      <!-- Excerpt -->
      <p class="font-body text-sm text-base-content/70 leading-relaxed line-clamp-3 flex-1">
        {{ article.excerpt }}
      </p>
    </div>

    <template #actions>
      <BaseButton variant="ghost" size="sm" class="group-hover:text-accent">
        Read More
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1"
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
      </BaseButton>
    </template>
  </BaseCard>
</template>
