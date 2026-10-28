const STORAGE_KEY = "travel-tour-favorites";

export function getSavedSlugs() {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveFavorite(slug) {
  const current = getSavedSlugs();
  if (!current.includes(slug)) {
    const updated = [...current, slug];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
}

export function removeFavorite(slug) {
  const current = getSavedSlugs();
  const updated = current.filter((s) => s !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function isFavorite(slug) {
  return getSavedSlugs().includes(slug);
}

export function toggleFavorite(slug) {
  if (isFavorite(slug)) {
    return { slugs: removeFavorite(slug), added: false };
  } else {
    return { slugs: saveFavorite(slug), added: true };
  }
}
