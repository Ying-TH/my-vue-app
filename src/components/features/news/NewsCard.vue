<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { formatDate } from '@/features/news/newsService.js'

defineProps({
  article: { type: Object, required: true },
  compact: { type: Boolean, default: false },
})

defineEmits(['read'])
</script>

<template>
  <!--
    NewsCard — renders a single news article in list/grid context.
    Used by NewsList.vue via v-for.

    Props:
      article  — full article object from newsService
      compact  — Boolean, reduces image height for denser layouts
  -->
  <BaseCard :hover="true" shadow="sm" class="h-full group overflow-hidden">
    <!-- Thumbnail -->
    <template #figure>
      <div :class="['relative w-full overflow-hidden', compact ? 'h-36' : 'h-44']">
        <img
          :src="article.thumbnailUrl || article.imageUrl"
          :alt="article.title"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <!-- Category badge -->
        <span
          class="absolute top-2.5 left-2.5 badge badge-sm font-mono uppercase tracking-wide border-0"
          style="background: oklch(var(--p) / 0.85); color: oklch(var(--pc))"
        >
          {{ article.category }}
        </span>
        <!-- Pinned indicator -->
        <span
          v-if="article.pinned"
          class="absolute top-2.5 right-2.5 badge badge-sm badge-accent border-0"
        >
          Pinned
        </span>
      </div>
    </template>

    <!-- Body -->
    <div class="flex flex-col gap-2 flex-1 p-4">
      <!-- Meta row -->
      <div class="flex items-center gap-2 text-xs opacity-50">
        <span>{{ article.author }}</span>
        <span>·</span>
        <span>{{ formatDate(article.publishedAt) }}</span>
        <span>·</span>
        <span>{{ article.readTime }} min</span>
      </div>

      <!-- Title -->
      <h3
        class="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-secondary transition-colors"
        style="color: oklch(var(--bc))"
      >
        {{ article.title }}
      </h3>

      <!-- Excerpt -->
      <p v-if="!compact" class="text-xs opacity-60 leading-relaxed line-clamp-2 flex-1">
        {{ article.excerpt }}
      </p>
    </div>

    <!-- Action -->
    <template #actions>
      <BaseButton variant="ghost" size="xs" class="gap-1 text-xs" @click="$emit('read', article)">
        Read More
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
