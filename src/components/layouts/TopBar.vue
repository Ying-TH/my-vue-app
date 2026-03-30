<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { usePortalStore, APP_CATEGORIES } from '@/stores/portal'

const auth = useAuthStore()
const portal = usePortalStore()
const router = useRouter()

const categories = APP_CATEGORIES
const activeCategoryId = computed(() => portal.activeCategoryId)
const initials = computed(() => auth.initials)
const userName = computed(() => auth.user?.name || 'User')
const userDepartment = computed(() => auth.user?.department || '')
const searchQuery = ref('')

const notifications = ref([
  { id: 1, title: 'Alex shared "Q2 Report.xlsx" with you', time: '5 min ago', read: false },
  { id: 2, title: 'New comment on "Project Phoenix" deck', time: '1 hour ago', read: false },
  { id: 3, title: 'Maintenance window reminder: Saturday', time: '2 hours ago', read: true },
])
const notificationCount = computed(() => notifications.value.filter((n) => !n.read).length)

function selectCategory(id) {
  portal.setCategory(id)
  // Navigate to first item in that category
  const cat = APP_CATEGORIES.find((c) => c.id === id)
  if (cat?.sidebar?.[0]?.path) {
    router.push(cat.sidebar[0].path)
  }
}

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'dashboard', query: { q: searchQuery.value } })
  }
}

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}

function closeDropdown() {
  document.activeElement?.blur()
}

function handleCategoryMobileSelect(id) {
  selectCategory(id)
  closeDropdown()
}
</script>

<template>
  <!--
    TopBar — fixed global navigation.
    Left:   App category selector (waffle/icons)
    Center: Global search bar
    Right:  Notification bell + User profile dropdown
  -->
  <header
    class="portal-topbar flex items-center px-3 gap-2 border-b"
    style="background: oklch(var(--b1)); border-color: oklch(var(--b3))"
  >
    <!-- ── Left: Logo + App Selector ─────────────────── -->
    <div class="flex items-center gap-1 shrink-0">
      <!-- Logo mark -->
      <RouterLink
        to="/portal/dashboard"
        class="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-200 transition-colors mr-1"
      >
        <div
          class="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-bold"
          style="background: oklch(var(--p))"
        >
          C
        </div>
        <span class="font-semibold text-sm hidden md:block" style="color: oklch(var(--bc))"
          >CorpPortal</span
        >
      </RouterLink>

      <!-- App category icon pills -->
      <nav class="hidden lg:flex items-center gap-0.5">
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['app-icon-btn px-3 py-2 text-xs gap-1', { active: activeCategoryId === cat.id }]"
          :title="cat.label"
          @click="selectCategory(cat.id)"
        >
          <span :class="['mdi', cat.icon, 'text-xl leading-none']"></span>
          <span class="hidden xl:block">{{ cat.label }}</span>
        </button>
      </nav>

      <!-- Mobile: waffle menu -->
      <div class="dropdown lg:hidden">
        <button tabindex="0" class="btn btn-ghost btn-sm btn-square" aria-label="App menu">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="5" r="1.8" />
            <circle cx="12" cy="5" r="1.8" />
            <circle cx="19" cy="5" r="1.8" />
            <circle cx="5" cy="12" r="1.8" />
            <circle cx="12" cy="12" r="1.8" />
            <circle cx="19" cy="12" r="1.8" />
            <circle cx="5" cy="19" r="1.8" />
            <circle cx="12" cy="19" r="1.8" />
            <circle cx="19" cy="19" r="1.8" />
          </svg>
        </button>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-48 z-50 border border-base-300"
        >
          <li v-for="cat in categories" :key="cat.id">
            <button class="flex gap-2 items-center" @click="handleCategoryMobileSelect(cat.id)">
              <i :class="['mdi', cat.icon, 'text-lg']"></i> {{ cat.label }}
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- ── Center: Global Search ─────────────────────── -->
    <div class="flex-1 max-w-xl mx-auto px-2">
      <div class="relative">
        <svg
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search files, people, docs…"
          class="input input-sm w-full pl-9 bg-base-200 border-transparent focus:border-primary focus:bg-base-100 transition-all font-body text-sm"
          @keydown.enter="handleSearch"
        />
      </div>
    </div>

    <!-- ── Right: Notifications + Profile ────────────── -->
    <div class="flex items-center gap-1 shrink-0">
      <!-- Notification bell -->
      <div class="dropdown dropdown-end">
        <button
          tabindex="0"
          class="btn btn-ghost btn-sm btn-square relative"
          aria-label="Notifications"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span
            v-if="notificationCount > 0"
            class="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent border border-base-100"
          />
        </button>
        <div
          tabindex="0"
          class="dropdown-content card card-compact w-80 shadow-xl bg-base-100 z-50 border border-base-300 mt-1"
        >
          <div class="card-body p-3">
            <div class="flex justify-between items-center mb-2">
              <h3 class="font-semibold text-sm">Notifications</h3>
              <span class="badge badge-sm badge-accent">{{ notificationCount }}</span>
            </div>
            <div class="space-y-1">
              <div
                v-for="n in notifications"
                :key="n.id"
                class="flex gap-3 p-2 rounded-lg hover:bg-base-200 cursor-pointer transition-colors"
              >
                <div
                  class="w-2 h-2 rounded-full mt-1.5 shrink-0"
                  :class="n.read ? 'bg-base-300' : 'bg-accent'"
                />
                <div>
                  <p class="text-xs font-medium">{{ n.title }}</p>
                  <p class="text-xs opacity-60 mt-0.5">{{ n.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile avatar dropdown -->
      <div class="dropdown dropdown-end">
        <button tabindex="0" class="btn btn-ghost btn-sm gap-2 px-2" aria-label="User menu">
          <div
            class="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style="background: oklch(var(--s))"
          >
            {{ initials }}
          </div>
          <span class="hidden md:block text-sm font-medium max-w-25 truncate">{{ userName }}</span>
          <svg class="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            />
          </svg>
        </button>
        <ul
          tabindex="0"
          class="dropdown-content menu menu-sm p-2 shadow-xl bg-base-100 rounded-box w-56 z-50 border border-base-300 mt-1"
        >
          <!-- User info header -->
          <li class="menu-title">
            <div class="py-1">
              <p class="font-semibold text-sm text-base-content">{{ userName }}</p>
              <p class="text-xs opacity-50 font-normal">{{ userDepartment }}</p>
            </div>
          </li>
          <div class="divider my-0.5" />
          <li>
            <a class="gap-2 text-sm"><span>◎</span> Status Settings</a>
          </li>
          <li>
            <a class="gap-2 text-sm"><span>◑</span> Appearance</a>
          </li>
          <li>
            <a class="gap-2 text-sm"><span>⚙</span> Settings</a>
          </li>
          <li>
            <a class="gap-2 text-sm"><span>◈</span> What's New</a>
          </li>
          <li>
            <a class="gap-2 text-sm"><span>?</span> Help & Privacy</a>
          </li>
          <div class="divider my-0.5" />
          <li>
            <button class="gap-2 text-sm text-error hover:bg-error/10" @click="handleLogout">
              <span>→</span> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
