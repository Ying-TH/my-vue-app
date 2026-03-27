<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('')
const currentYear = new Date().getFullYear()

const sectionLinks = [
  { name: 'Latest News', path: '/news' },
  { name: 'World', path: '/news' },
  { name: 'Politics', path: '/news' },
  { name: 'Technology', path: '/news' },
  { name: 'Science', path: '/news' },
  { name: 'Culture', path: '/news' },
]

const companyLinks = [
  { name: 'About Us', href: '#' },
  { name: 'Careers', href: '#' },
  { name: 'Advertise', href: '#' },
  { name: 'Contact', href: '#' },
]
</script>

<template>
  <footer class="bg-primary text-primary-content mt-16">
    <!-- Main grid -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <h2 class="font-display font-black text-3xl mb-1">The Scoop</h2>
          <p class="dateline text-primary-content/50 mb-4">Est. 2024 · Digital Edition</p>
          <p class="font-body text-sm text-primary-content/70 leading-relaxed">
            Delivering trusted, independent journalism to readers around the world.
          </p>
        </div>

        <!-- Sections -->
        <div>
          <h3 class="font-display font-bold text-lg mb-4 text-secondary">Sections</h3>
          <ul class="space-y-2">
            <li v-for="link in sectionLinks" :key="link.name">
              <RouterLink
                :to="link.path"
                class="font-body text-sm text-primary-content/70 hover:text-secondary transition-colors"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div>
          <h3 class="font-display font-bold text-lg mb-4 text-secondary">Company</h3>
          <ul class="space-y-2">
            <li v-for="link in companyLinks" :key="link.name">
              <a
                :href="link.href"
                class="font-body text-sm text-primary-content/70 hover:text-secondary transition-colors"
              >
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="font-display font-bold text-lg mb-4 text-secondary">Newsletter</h3>
          <p class="font-body text-sm text-primary-content/70 mb-3">
            Top stories delivered to your inbox every morning.
          </p>
          <div class="flex flex-col gap-2">
            <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="input input-sm w-full bg-primary-content/10 border-primary-content/20 text-primary-content placeholder:text-primary-content/40"
            />
            <button class="btn btn-secondary btn-sm w-full font-body">Subscribe</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-primary-content/10">
      <div
        class="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2"
      >
        <p class="dateline text-primary-content/40 text-[10px]">
          © {{ currentYear }} The Scoop. All rights reserved.
        </p>
        <div class="flex gap-4">
          <a
            href="#"
            class="dateline text-primary-content/40 text-[10px] hover:text-secondary transition-colors"
            >Privacy</a
          >
          <a
            href="#"
            class="dateline text-primary-content/40 text-[10px] hover:text-secondary transition-colors"
            >Terms</a
          >
          <a
            href="#"
            class="dateline text-primary-content/40 text-[10px] hover:text-secondary transition-colors"
            >Accessibility</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
