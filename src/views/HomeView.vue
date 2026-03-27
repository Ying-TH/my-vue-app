<script setup>
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import NewsScoopSection from '@/features/news/components/NewsScoopSection.vue'

const tickerHeadlines = [
  'Fed holds rates steady amid economic uncertainty',
  "Alzheimer's protein marker identified 15 years early",
  'Ancient Mayan city uncovered beneath Guatemalan rainforest',
  'Ocean Cleanup removes 10 million pounds of plastic',
  'Markets surge on Fed rate pause signal',
]

const categories = [
  { name: 'World', icon: '🌍' },
  { name: 'Politics', icon: '🏛️' },
  { name: 'Technology', icon: '💻' },
  { name: 'Science', icon: '🔬' },
  { name: 'Business', icon: '📈' },
  { name: 'Culture', icon: '🎭' },
]
</script>

<template>
  <div>
    <!-- Hero  -->
    <section class="bg-primary text-primary-content overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          <div class="lg:col-span-2 space-y-4">
            <span class="dateline text-secondary">Breaking · World</span>
            <h1 class="font-display font-black text-4xl md:text-5xl xl:text-6xl leading-[1.05]">
              Global Climate Summit Reaches Historic Carbon Agreement
            </h1>
            <p class="font-body text-base text-primary-content/70 leading-relaxed max-w-prose">
              World leaders gathered in Geneva to sign the most ambitious climate accord in history,
              committing 140 nations to net-zero by 2045.
            </p>
            <div class="flex items-center gap-4 pt-2">
              <RouterLink to="/news/1">
                <BaseButton variant="secondary" size="md">Read Full Story</BaseButton>
              </RouterLink>
              <RouterLink
                to="/news"
                class="font-body text-sm text-primary-content/60 hover:text-secondary transition-colors underline underline-offset-2"
              >
                More Headlines
              </RouterLink>
            </div>
          </div>

          <div class="lg:col-span-3 relative">
            <div class="relative rounded-xl overflow-hidden shadow-2xl aspect-16/10">
              <img
                src="https://picsum.photos/seed/hero/900/560"
                alt="Climate Summit"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent" />
            </div>
            <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <span class="dateline text-primary-content/80 text-[11px]"
                >Geneva, Switzerland · March 26, 2026</span
              >
              <span class="badge badge-secondary font-mono text-xs">Live Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Breaking ticker -->
    <div class="bg-accent text-accent-content py-2 overflow-hidden">
      <div class="flex items-center">
        <span
          class="font-mono font-bold text-xs tracking-widest uppercase shrink-0 bg-accent-content/20 px-3 py-1 mr-4"
        >
          Breaking
        </span>
        <div class="flex gap-8 overflow-hidden">
          <span
            v-for="(h, i) in tickerHeadlines"
            :key="i"
            class="font-body text-sm whitespace-nowrap shrink-0"
          >
            {{ h }} <span class="mx-3 opacity-40">✦</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Latest News -->
    <NewsScoopSection />

    <!-- Category tiles -->
    <section class="py-16 bg-base-200">
      <div class="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Explore by Section"
          eyebrow="Coverage"
          :decorated="true"
          size="md"
          align="center"
        />
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          <RouterLink
            v-for="cat in categories"
            :key="cat.name"
            to="/news"
            class="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-base-100 hover:bg-primary hover:text-primary-content transition-all duration-200 border border-base-300 hover:border-primary"
          >
            <span class="text-2xl">{{ cat.icon }}</span>
            <span class="font-body font-semibold text-sm text-center">{{ cat.name }}</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
