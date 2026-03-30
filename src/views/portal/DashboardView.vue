<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/BaseButton.vue'
import SectionTitle from '@/components/base/SectionTitle.vue'
import NewsWidget from '@/components/features/news/NewsWidget.vue'

const auth = useAuthStore()
const firstName = computed(() => auth.user?.name?.split(' ')[0] || 'there')
const openTasks = 12

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
})

const timeOfDay = computed(() => {
  const h = new Date().getHours()
  return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
})

const stats = [
  { label: 'Open Tasks', value: 12, delta: '+3 this week', colorClass: 'text-primary' },
  { label: 'Files Shared', value: 48, delta: '+8 today', colorClass: 'text-secondary' },
  { label: 'Messages', value: 7, delta: '3 unread', colorClass: 'text-accent' },
  { label: 'Upcoming Events', value: 3, delta: 'Next: 2pm', colorClass: 'text-info' },
]

const quickLinks = [
  { label: 'My Files', icon: '📁', hint: 'Browse documents', path: '/portal/files' },
  { label: 'Calendar', icon: '📅', hint: '3 events today', path: '/portal/calendar' },
  { label: 'Talk', icon: '💬', hint: '3 unread', path: '/portal/talk' },
  { label: 'Tasks', icon: '✅', hint: '12 open items', path: '/portal/tasks' },
  { label: 'Contacts', icon: '👥', hint: 'Company directory', path: '/portal/contacts' },
  { label: 'News', icon: '📰', hint: 'All announcements', path: '/portal/news' },
]
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-8">
    <!-- Welcome -->
    <div class="flex items-start justify-between">
      <div>
        <h1 class="text-2xl font-bold">Good {{ timeOfDay }}, {{ firstName }}</h1>
        <p class="text-sm opacity-60 mt-0.5">{{ today }} · {{ openTasks }} open tasks</p>
      </div>
      <BaseButton variant="outline" size="sm" class="hidden md:flex gap-2">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Quick Add
      </BaseButton>
    </div>

    <!-- Stat cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="card bg-base-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      >
        <div class="card-body p-4">
          <p class="text-xs font-semibold uppercase tracking-wider opacity-50">{{ stat.label }}</p>
          <p class="text-3xl font-bold mt-1" :class="stat.colorClass">{{ stat.value }}</p>
          <p class="text-xs opacity-50 mt-0.5">{{ stat.delta }}</p>
        </div>
      </div>
    </div>

    <!-- Main content grid: NewsWidget + quick links + activity -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- NewsWidget spans 2 columns on xl -->
      <div class="xl:col-span-2">
        <!--
          NewsWidget — calls newsService.getLatestNews() internally.
          Clicking "View All" → /portal/news
          Clicking an item  → /portal/news/:id
        -->
        <NewsWidget :limit="4" title="Latest News" />
      </div>

      <!-- Quick links -->
      <div class="card bg-base-100 shadow-sm">
        <div class="card-body p-4">
          <SectionTitle title="Quick Access" size="md" tag="h2" />
          <div class="space-y-1">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.path"
              :to="link.path"
              class="flex items-center gap-3 p-2 rounded-xl hover:bg-base-200 transition-colors group"
            >
              <span class="text-lg w-8 text-center shrink-0">{{ link.icon }}</span>
              <div class="min-w-0">
                <p class="text-sm font-medium group-hover:text-secondary transition-colors">
                  {{ link.label }}
                </p>
                <p class="text-xs opacity-40">{{ link.hint }}</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
