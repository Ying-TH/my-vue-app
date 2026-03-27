// src/features/news/mockData.js
// Replace these with real API calls when the backend is ready.

export const mockArticles = [
  {
    id: 1,
    headline: 'Global Climate Summit Reaches Historic Carbon Agreement',
    excerpt:
      'World leaders convened in Geneva to sign a landmark accord committing 140 nations to net-zero emissions targets by 2045, the most ambitious climate deal ever reached.',
    category: 'World',
    author: 'Elena Vasquez',
    publishedAt: '2026-03-26T08:00:00Z',
    imageUrl: 'https://picsum.photos/seed/climate/800/500',
    readTime: 5,
  },
  {
    id: 2,
    headline: 'Tech Giants Face New Antitrust Scrutiny Over AI Dominance',
    excerpt:
      'Regulators in the EU and US have launched parallel investigations into whether leading AI companies have created unfair monopolies in the emerging intelligence economy.',
    category: 'Technology',
    author: 'Marcus Chen',
    publishedAt: '2026-03-25T14:30:00Z',
    imageUrl: 'https://picsum.photos/seed/tech/800/500',
    readTime: 4,
  },
  {
    id: 3,
    headline: "Breakthrough in Alzheimer's Research Offers New Hope",
    excerpt:
      'Scientists at Johns Hopkins have identified a protein marker that appears 15 years before symptom onset, potentially enabling early intervention and treatment.',
    category: 'Science',
    author: 'Dr. Priya Nair',
    publishedAt: '2026-03-25T10:00:00Z',
    imageUrl: 'https://picsum.photos/seed/science/800/500',
    readTime: 6,
  },
  {
    id: 4,
    headline: 'Markets Surge as Federal Reserve Signals Rate Pause',
    excerpt:
      'The Dow gained 2.3% on Wednesday after Fed Chair Powell indicated the central bank would hold rates steady through the summer to assess the impact of recent policy shifts.',
    category: 'Business',
    author: 'James Holloway',
    publishedAt: '2026-03-24T17:45:00Z',
    imageUrl: 'https://picsum.photos/seed/finance/800/500',
    readTime: 3,
  },
  {
    id: 5,
    headline: 'Ancient Mayan City Discovered Beneath Guatemalan Rainforest',
    excerpt:
      'A team of archaeologists using LiDAR technology has uncovered a vast urban complex covering 650 square kilometres, rewriting our understanding of Mayan civilisation.',
    category: 'Culture',
    author: 'Sofia Ramírez',
    publishedAt: '2026-03-24T09:00:00Z',
    imageUrl: 'https://picsum.photos/seed/archaeology/800/500',
    readTime: 7,
  },
  {
    id: 6,
    headline: 'Ocean Cleanup Project Removes 10 Million Pounds of Plastic',
    excerpt:
      'The ambitious five-year initiative announced a milestone achievement, having extracted the equivalent of over 50,000 garbage trucks worth of plastic from the Pacific.',
    category: 'World',
    author: 'Noah Klein',
    publishedAt: '2026-03-23T12:00:00Z',
    imageUrl: 'https://picsum.photos/seed/ocean/800/500',
    readTime: 4,
  },
]

export function getArticleById(id) {
  return mockArticles.find((a) => a.id === Number(id)) || null
}

export function getTopArticles(n = 4) {
  return mockArticles.slice(0, n)
}

export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}
