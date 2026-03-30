// src/features/news/newsService.js
//
// Abstraction layer for all news API calls.
// Swap the BASE_URL and remove mock fallbacks when the real backend is ready.
// Every function returns a normalised { data, error } envelope so callers
// never need to handle raw fetch/axios errors themselves.

const BASE_URL = import.meta.env.VITE_API_URL || ''
const USE_MOCK = !BASE_URL // automatically uses mock data when no API URL is set

// ── Mock data store (remove when backend is ready) ────────────────────────
const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'Q1 Results: Company Exceeds Revenue Targets by 14%',
    excerpt:
      'Finance leadership announced this morning that Q1 performance surpassed forecasts across all business units, led by strong demand in the APAC region.',
    body: `<p>Finance leadership announced this morning that Q1 performance surpassed forecasts across all business units, led by strong demand in the APAC region.</p>
<p>The results reflect sustained growth in our core product lines alongside strategic cost optimisations implemented in late 2025. The board has approved a reinvestment plan targeting expanded operations in three new markets.</p>
<blockquote>This is the result of every team operating with discipline and focus. We head into Q2 with strong momentum.</blockquote>
<p>Detailed breakdowns by department will be shared in the all-hands meeting scheduled for Friday. All staff are encouraged to attend or watch the live stream via the portal.</p>`,
    category: 'Finance',
    author: 'Sarah Mitchell',
    authorInitials: 'SM',
    publishedAt: '2026-03-26T08:00:00Z',
    imageUrl: 'https://picsum.photos/seed/finance-q1/800/450',
    thumbnailUrl: 'https://picsum.photos/seed/finance-q1/400/225',
    readTime: 3,
    pinned: true,
    tags: ['Finance', 'Q1', 'Results'],
  },
  {
    id: 2,
    title: 'New Hybrid Work Policy Takes Effect April 1st',
    excerpt:
      'HR has published updated flexible working guidelines. All employees are encouraged to review the new minimum in-office requirements.',
    body: `<p>HR has published the updated flexible working guidelines effective April 1st, 2026. All employees are encouraged to review the new minimum in-office requirements and update their schedules accordingly.</p>
<p>Key changes include a minimum of two in-office days per week for most roles, with exceptions for roles designated as fully remote. Managers will work with their teams to establish consistent schedules by March 31st.</p>
<p>The updated policy document is available in the HR section of the portal. Questions should be directed to your line manager or HR business partner.</p>`,
    category: 'HR',
    author: 'James Okafor',
    authorInitials: 'JO',
    publishedAt: '2026-03-25T10:30:00Z',
    imageUrl: 'https://picsum.photos/seed/hybrid-work/800/450',
    thumbnailUrl: 'https://picsum.photos/seed/hybrid-work/400/225',
    readTime: 4,
    pinned: false,
    tags: ['HR', 'Policy', 'Hybrid'],
  },
  {
    id: 3,
    title: 'IT Infrastructure Upgrade: Cloud Migration Complete',
    excerpt:
      'The IT department has successfully completed the 6-month migration project, moving all legacy on-premise servers to the new cloud environment.',
    body: `<p>The IT department has successfully completed the 6-month migration project, moving all legacy on-premise servers to the new cloud environment with zero data loss.</p>
<p>The migration covered 47 applications, 12 databases, and over 800 TB of file storage. Performance benchmarks show a 40% improvement in average response times and a 99.98% uptime record during the transition period.</p>
<p>Users may notice faster load times across all portal applications starting this week. The IT helpdesk remains available for any issues encountered during the stabilisation period.</p>`,
    category: 'IT',
    author: 'Priya Nair',
    authorInitials: 'PN',
    publishedAt: '2026-03-24T14:00:00Z',
    imageUrl: 'https://picsum.photos/seed/cloud-infra/800/450',
    thumbnailUrl: 'https://picsum.photos/seed/cloud-infra/400/225',
    readTime: 5,
    pinned: false,
    tags: ['IT', 'Infrastructure', 'Cloud'],
  },
  {
    id: 4,
    title: 'Employee of the Month: Congratulations to David Chen',
    excerpt:
      'The recognition committee has selected David Chen from Operations for his outstanding work on the Phoenix automation project.',
    body: `<p>The recognition committee has selected David Chen from the Operations team as Employee of the Month for March 2026.</p>
<p>David was nominated for his exceptional contribution to the Phoenix automation project, which reduced manual processing time by 68% across three departments. His initiative in identifying further automation opportunities has already been greenlit for Q2 implementation.</p>
<p>David will be presented with his award at the monthly all-hands meeting on Friday. Please join us in congratulating him.</p>`,
    category: 'Culture',
    author: 'Comms Team',
    authorInitials: 'CT',
    publishedAt: '2026-03-23T09:00:00Z',
    imageUrl: 'https://picsum.photos/seed/employee-month/800/450',
    thumbnailUrl: 'https://picsum.photos/seed/employee-month/400/225',
    readTime: 2,
    pinned: false,
    tags: ['Culture', 'Recognition'],
  },
  {
    id: 5,
    title: 'Annual Safety Training Due by End of April',
    excerpt:
      'All staff are reminded that mandatory HSE training modules must be completed by April 30th via the LMS portal.',
    body: `<p>All staff are reminded that mandatory HSE (Health, Safety & Environment) training modules must be completed by April 30th, 2026.</p>
<p>This year's programme includes three modules: Fire Safety Refresher, Manual Handling, and the new Cybersecurity Awareness module introduced following the ISO 27001 audit. Each module takes approximately 20–30 minutes to complete.</p>
<p>Access the LMS portal via the Forms section in CorpPortal. Staff who have not completed all modules by the deadline will be flagged to their line managers. Contact the Safety Team if you encounter any technical issues.</p>`,
    category: 'HSE',
    author: 'Safety Team',
    authorInitials: 'ST',
    publishedAt: '2026-03-22T11:00:00Z',
    imageUrl: 'https://picsum.photos/seed/safety-training/800/450',
    thumbnailUrl: 'https://picsum.photos/seed/safety-training/400/225',
    readTime: 2,
    pinned: false,
    tags: ['HSE', 'Training', 'Mandatory'],
  },
  {
    id: 6,
    title: 'New Canteen Menu Launches Monday — Feedback Welcome',
    excerpt:
      'Facilities has partnered with a new catering provider starting next week. A survey link will be distributed for staff to rate the new options.',
    body: `<p>Facilities has partnered with a new catering provider, GreenPlate, starting Monday March 30th. The new menu features an expanded selection of hot meals, a dedicated allergen-free section, and a weekly rotating specials board.</p>
<p>Pricing remains unchanged. Payment via the existing contactless terminals is supported; the new provider also accepts the corporate meal allowance card.</p>
<p>A short feedback survey will be distributed via email on Monday. Your input will directly shape the menu for the following month. Facilities thanks everyone for their patience during the transition.</p>`,
    category: 'Facilities',
    author: 'Facilities Team',
    authorInitials: 'FT',
    publishedAt: '2026-03-21T15:00:00Z',
    imageUrl: 'https://picsum.photos/seed/canteen-new/800/450',
    thumbnailUrl: 'https://picsum.photos/seed/canteen-new/400/225',
    readTime: 2,
    pinned: false,
    tags: ['Facilities', 'Canteen'],
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────
function ok(data) {
  return { data, error: null }
}
function err(msg) {
  return { data: null, error: msg }
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json()
}

function simulateDelay(ms = 400) {
  return new Promise((r) => setTimeout(r, ms))
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatDateLong(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Fetch all news articles, optionally filtered by category.
 * @param {{ category?: string, limit?: number }} params
 * @returns {Promise<{ data: Article[]|null, error: string|null }>}
 */
export async function getNewsList({ category, limit } = {}) {
  try {
    if (USE_MOCK) {
      await simulateDelay(500)
      let results = [...MOCK_ARTICLES].sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt),
      )
      if (category && category !== 'All') {
        results = results.filter((a) => a.category === category)
      }
      if (limit) results = results.slice(0, limit)
      return ok(results)
    }
    const data = await apiFetch(`/news?${new URLSearchParams({ category, limit })}`)
    return ok(data)
  } catch (e) {
    return err(e.message)
  }
}

/**
 * Fetch a single article by ID.
 * @param {number|string} id
 * @returns {Promise<{ data: Article|null, error: string|null }>}
 */
export async function getNewsById(id) {
  try {
    if (USE_MOCK) {
      await simulateDelay(400)
      const article = MOCK_ARTICLES.find((a) => a.id === Number(id))
      if (!article) throw new Error('Article not found')
      return ok(article)
    }
    const data = await apiFetch(`/news/${id}`)
    return ok(data)
  } catch (e) {
    return err(e.message)
  }
}

/**
 * Fetch the N most recent articles for the dashboard widget.
 * @param {number} limit  — defaults to 4
 */
export async function getLatestNews(limit = 4) {
  return getNewsList({ limit })
}

/**
 * Create a new article (admin only).
 * @param {Partial<Article>} payload
 */
export async function createNews(payload) {
  try {
    if (USE_MOCK) {
      await simulateDelay(600)
      const newArticle = {
        ...payload,
        id: MOCK_ARTICLES.length + 1,
        publishedAt: new Date().toISOString(),
      }
      MOCK_ARTICLES.unshift(newArticle)
      return ok(newArticle)
    }
    const data = await apiFetch('/news', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    return ok(data)
  } catch (e) {
    return err(e.message)
  }
}

/**
 * Update an existing article (admin only).
 * @param {number|string} id
 * @param {Partial<Article>} payload
 */
export async function updateNews(id, payload) {
  try {
    if (USE_MOCK) {
      await simulateDelay(500)
      const idx = MOCK_ARTICLES.findIndex((a) => a.id === Number(id))
      if (idx === -1) throw new Error('Article not found')
      MOCK_ARTICLES[idx] = { ...MOCK_ARTICLES[idx], ...payload }
      return ok(MOCK_ARTICLES[idx])
    }
    const data = await apiFetch(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
    return ok(data)
  } catch (e) {
    return err(e.message)
  }
}

/**
 * Delete an article (admin only).
 * @param {number|string} id
 */
export async function deleteNews(id) {
  try {
    if (USE_MOCK) {
      await simulateDelay(400)
      const idx = MOCK_ARTICLES.findIndex((a) => a.id === Number(id))
      if (idx === -1) throw new Error('Article not found')
      MOCK_ARTICLES.splice(idx, 1)
      return ok({ deleted: true })
    }
    await apiFetch(`/news/${id}`, { method: 'DELETE' })
    return ok({ deleted: true })
  } catch (e) {
    return err(e.message)
  }
}
