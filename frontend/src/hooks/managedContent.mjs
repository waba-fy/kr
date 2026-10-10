export async function loadManagedContent(url, fetcher = fetch) {
  const response = await fetcher(url);
  const result = await response.json();
  if (!response.ok || !Array.isArray(result.data)) throw new Error('Content is unavailable.');
  return result.data.map(entry => entry.data);
}
