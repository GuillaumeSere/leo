type VideoLike = {
  id: string;
  title: string;
  description?: string;
  tags?: string[];
};

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u00c0-\u017f\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toTokenSet(text: string) {
  if (!text) return new Set<string>();
  return new Set(
    normalizeText(text)
      .split(" ")
      .filter((t) => t.length > 2)
  );
}

function toTagSet(tags?: string[]) {
  if (!tags || tags.length === 0) return new Set<string>();
  return new Set(tags.map((t) => normalizeText(t)).filter(Boolean));
}

function intersectionSize(a: Set<string>, b: Set<string>) {
  let count = 0;
  a.forEach((v) => {
    if (b.has(v)) count += 1;
  });
  return count;
}

export function getRecommendations<T extends VideoLike>(
  videos: T[],
  seed: T,
  limit = 6
) {
  const seedTags = toTagSet(seed.tags);
  const seedTokens = toTokenSet(`${seed.title} ${seed.description ?? ""}`);

  const scored = videos
    .filter((v) => v.id !== seed.id)
    .map((v) => {
      const tags = toTagSet(v.tags);
      const tokens = toTokenSet(`${v.title} ${v.description ?? ""}`);
      const tagOverlap = intersectionSize(seedTags, tags);
      const textOverlap = intersectionSize(seedTokens, tokens);
      const score = tagOverlap * 3 + textOverlap;
      return { video: v, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.video);

  if (scored.length > 0) return scored;

  return videos.filter((v) => v.id !== seed.id).slice(0, limit);
}
