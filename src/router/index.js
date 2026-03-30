import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// ── Public views (eager — needed on first load) ────────
import LoginView from '@/views/auth/LoginView.vue'

// ── Layout shell (lazy) ────────────────────────────────
const PortalLayout = () => import('@/components/layouts/PortalLayout.vue')

// ── ✅ Active Features — production-ready, lazy-loaded ──
const DashboardView = () => import('@/views/portal/DashboardView.vue')
const NewsView = () => import('@/views/portal/NewsView.vue')
const NewsDetailView = () => import('@/views/portal/NewsDetailView.vue')

// ── 🏗️ Future Modules — Placeholder strategy ───────────
// All scaffold routes point to DashboardView until their
// dedicated view is built and promoted to Active Features.
// This prevents 404s and keeps sidebar navigation functional.
const Placeholder = DashboardView

// ──────────────────────────────────────────────────────
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    // ── Public ────────────────────────────────────────
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { public: true },
    },

    // ── Root redirect ─────────────────────────────────
    {
      path: '/',
      redirect: '/portal/dashboard',
    },

    // ── Protected portal shell ────────────────────────
    {
      path: '/portal',
      component: PortalLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: { name: 'dashboard' } },

        // ✅ Active Features
        // Production-ready modules with dedicated views.
        { path: 'dashboard', name: 'dashboard', component: DashboardView },
        { path: 'news', name: 'news', component: NewsView },
        { path: 'news/:id', name: 'news-detail', component: NewsDetailView },

        // 🏗️ Future Modules (Scaffold)
        // Pre-defined routes for the roadmap.
        // Linked to Placeholder to ensure stable UX until each
        // module is ready to be promoted to Active Features.
        { path: 'files', name: 'files', component: Placeholder },
        { path: 'talk', name: 'talk', component: Placeholder },
        { path: 'calendar', name: 'calendar', component: Placeholder },
        { path: 'contacts', name: 'contacts', component: Placeholder },
        { path: 'notes', name: 'notes', component: Placeholder },
        { path: 'deck', name: 'deck', component: Placeholder },
        { path: 'tasks', name: 'tasks', component: Placeholder },
        { path: 'tables', name: 'tables', component: Placeholder },
        { path: 'photos', name: 'photos', component: Placeholder },
        { path: 'collectives', name: 'collectives', component: Placeholder },
        { path: 'forms', name: 'forms', component: Placeholder },
        { path: 'mail', name: 'mail', component: Placeholder },
        { path: 'activities', name: 'activities', component: Placeholder },
        { path: 'directory', name: 'directory', component: Placeholder },
        { path: 'trf', name: 'trf', component: Placeholder },
      ],
    },

    // ── 404 fallback ──────────────────────────────────
    {
      path: '/:pathMatch(.*)*',
      redirect: '/portal/dashboard',
    },
  ],
})

// ── Navigation guard ──────────────────────────────────
router.beforeEach((to) => {
  // ⚡ DEV BYPASS — skip auth during UI development
  // Remove this block (or set to false) before merging to staging/production
  if (import.meta.env.DEV) return true

  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
