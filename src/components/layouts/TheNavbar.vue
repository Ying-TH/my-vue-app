<script setup>
import { RouterLink } from 'vue-router'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'News', path: '/news' },
  { name: 'World', path: '/news' },
  { name: 'Politics', path: '/news' },
  { name: 'Tech', path: '/news' },
]

const formattedDate = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

function closeDropdown() {
  document.activeElement?.blur()
}
</script>

<template>
  <header class="sticky top-0 z-50 bg-base-100/95 backdrop-blur-sm ruled-bottom">
    <!-- Top strip: date + edition -->
    <div class="bg-primary text-primary-content py-1 px-4 hidden md:block">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <span class="dateline text-primary-content/70">{{ formattedDate }}</span>
        <span class="dateline text-primary-content/70">The Scoop - Digital Edition</span>
      </div>
    </div>

    <!-- Main bar -->
    <div class="navbar max-w-7xl mx-auto px-4 py-2">
      <!-- Mobile hamburger -->
      <div class="navbar-start lg:hidden">
        <div class="dropdown">
          <button tabindex="0" class="btn btn-ghost btn-square" aria-label="Open menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            tabindex="0"
            class="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-300"
          >
            <li v-for="link in navLinks" :key="link.name">
              <RouterLink :to="link.path" class="font-body font-semibold" @click="closeDropdown">
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Logo / masthead -->
      <div class="navbar-center lg:navbar-start">
        <RouterLink to="/" class="flex flex-col items-center lg:items-start group">
          <span
            class="font-display font-black text-2xl md:text-3xl leading-none tracking-tight text-primary group-hover:text-accent transition-colors"
          >
            The Scoop
          </span>
          <span class="dateline text-[10px] hidden md:block">
            Est. 2024 · All the news fit to read
          </span>
        </RouterLink>
      </div>

      <!-- Desktop nav -->
      <div class="navbar-center hidden lg:flex">
        <nav class="flex items-center gap-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="btn btn-ghost btn-sm font-body font-semibold tracking-wide rounded-none border-b-2 border-transparent hover:border-accent hover:bg-transparent transition-all"
            active-class="border-accent text-accent"
          >
            {{ link.name }}
          </RouterLink>
        </nav>
      </div>

      <!-- Right actions -->
      <div class="navbar-end gap-2">
        <button class="btn btn-ghost btn-square btn-sm" aria-label="Search">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <RouterLink to="/login" class="btn btn-primary btn-sm font-body"> SignIn </RouterLink>
      </div>
    </div>
  </header>
</template>
