<script setup>
import { formatDate, formatDateLong } from '@/features/news/newsService.js'

defineProps({
  article: { type: Object, required: true },
})

defineEmits(['share', 'tag-click'])
</script>

<template>
  <!--
    NewsContent — renders the full content of a single news article.
    Used by NewsDetailView.vue.
    Receives the complete article object and renders:
      - Hero image
      - Category, author, date, read time
      - HTML body (v-html, sanitise server-side before storing)
      - Tags
  -->
  <article class="card bg-base-100 shadow-sm overflow-hidden">
    <!-- Hero image -->
    <figure class="h-56 md:h-72 overflow-hidden">
      <img :src="article.imageUrl" :alt="article.title" class="w-full h-full object-cover" />
    </figure>

    <div class="card-body p-6 md:p-8 gap-5">
      <!-- ── Meta ───────────────────────────────────── -->
      <div class="flex items-center gap-2 flex-wrap">
        <span
          class="badge badge-sm font-mono uppercase tracking-wide border-0"
          style="background: oklch(var(--p) / 0.1); color: oklch(var(--p))"
        >
          {{ article.category }}
        </span>
        <span v-if="article.pinned" class="badge badge-sm badge-accent">Pinned</span>
        <span class="text-xs opacity-40 ml-auto">{{ article.readTime }} min read</span>
      </div>

      <!-- ── Title ──────────────────────────────────── -->
      <h1 class="text-2xl md:text-3xl font-bold leading-tight">
        {{ article.title }}
      </h1>

      <!-- ── Byline ─────────────────────────────────── -->
      <div class="flex items-center gap-3 pb-5 border-b border-base-300">
        <!-- Author avatar -->
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
          style="background: oklch(var(--s))"
        >
          {{ article.authorInitials }}
        </div>
        <div>
          <p class="text-sm font-semibold">{{ article.author }}</p>
          <p class="text-xs opacity-50">{{ formatDateLong(article.publishedAt) }}</p>
        </div>

        <!-- Share button -->
        <div class="ml-auto flex gap-2">
          <button class="btn btn-ghost btn-xs gap-1.5" @click="$emit('share', article)">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Share
          </button>
        </div>
      </div>

      <!-- ── Body ───────────────────────────────────── -->
      <!--
        v-html renders the stored HTML body.
        IMPORTANT: Ensure body content is sanitised server-side (e.g. DOMPurify)
        before being stored. Never render unsanitised user input via v-html.
      -->
      <div
        class="prose prose-sm max-w-none leading-relaxed text-base-content"
        v-html="article.body"
      />

      <!-- ── Tags ───────────────────────────────────── -->
      <div v-if="article.tags?.length" class="flex flex-wrap gap-2 pt-4 border-t border-base-300">
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="badge badge-outline badge-sm font-mono cursor-pointer hover:badge-primary transition-colors"
          @click="$emit('tag-click', tag)"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>
