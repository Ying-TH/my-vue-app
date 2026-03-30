import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// App category definitions
export const APP_CATEGORIES = [
  {
    id: 'workspace',
    label: 'Workspace',
    icon: 'mdi-briefcase',
    sidebar: [
      { id: 'dashboard', label: 'Dashboard', icon: 'mdi-view-dashboard', path: 'portal/dashboard' },
      { id: 'notes', label: 'Notes', icon: 'mdi-note-multiple', path: 'portal/notes' },
      { id: 'decks', label: 'Decks', icon: 'mdi-cards-playing-outline', path: 'portal/decks' },
      { id: 'tasks', label: 'Tasks', icon: 'mdi-format-list-checkbox', path: 'portal/tasks' },
      { id: 'tables', label: 'Tables', icon: 'mdi-table-large', path: 'portal/tables' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: 'mdi-folder',
    sidebar: [
      { id: 'files', label: 'Files', icon: 'mdi-file', path: 'portal/files' },
      { id: 'photos', label: 'Photos', icon: 'mdi-image', path: 'portal/photos' },
      {
        id: 'collectives',
        label: 'Collective',
        icon: 'mdi-account-group',
        path: 'portal/collectives',
      },
      { id: 'forms', label: 'Forms', icon: 'mdi-form-select', path: 'portal/forms' },
    ],
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    icon: 'mdi-account-multiple',
    sidebar: [
      { id: 'talk', label: 'Talk', icon: 'mdi-chat', path: 'portal/talk' },
      { id: 'mail', label: 'Mail', icon: 'mdi-email', path: 'portal/mail' },
      {
        id: 'activity',
        label: 'Activity',
        icon: 'mdi-chart-timeline-variant-shimmer',
        path: 'portal/activity',
      },
      { id: 'calendar', label: 'Calendar', icon: 'mdi-calendar-month', path: 'portal/calendar' },
    ],
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: 'mdi-calendar-clock',
    sidebar: [
      { id: 'calendar', label: 'Calendar', icon: 'mdi-calendar-month', path: 'portal/calendar' },
      { id: 'tasks', label: 'Tasks', icon: 'mdi-format-list-checkbox', path: 'portal/tasks' },
      { id: 'notes', label: 'Notes', icon: 'mdi-note-multiple', path: 'portal/notes' },
    ],
  },
  {
    id: 'organization',
    label: 'Organization',
    icon: 'mdi-cog',
    sidebar: [
      { id: 'contacts', label: 'Contacts', icon: 'mdi-account-box', path: 'portal/contacts' },
      { id: 'directory', label: 'Directory', icon: 'mdi-account-tie', path: 'portal/directory' },
      { id: 'trf', label: 'TRF', icon: 'mdi-file-document-edit', path: 'portal/trf' },
    ],
  },
]

export const usePortalStore = defineStore('portal', () => {
  const activeCategoryId = ref('workspace')
  const sidebarOpen = ref(true)

  const activeCategory = computed(() => {
    return APP_CATEGORIES.find((cat) => cat.id === activeCategoryId.value) || APP_CATEGORIES[0]
  })

  function setCategory(id) {
    activeCategoryId.value = id
  }

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  return { activeCategoryId, sidebarOpen, activeCategory, setCategory, toggleSidebar }
})
