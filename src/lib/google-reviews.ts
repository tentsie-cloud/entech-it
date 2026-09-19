/**
 * Server-only. Fetches real reviews from Google's Place Details endpoint.
 * Requires GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID to be set (Vercel
 * project env vars, never exposed to the client). Returns null when
 * unconfigured or on any fetch error, so callers can hide the UI rather
 * than show stale or fabricated data.
 *
 * Google's API caps this at 5 reviews and forbids re-ordering, editing, or
 * cherry-picking them, so we pass through whatever it returns as-is.
 */

export type GoogleReview = {
  author: string;
  authorPhoto: string | null;
  rating: number;
  text: string;
  relativeTime: string;
  time: number;
};

export type GoogleReviewsData = {
  rating: number;
  reviewCount: number;
  reviews: GoogleReview[];
  mapsUrl: string;
};

export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) return null;

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", placeId);
  url.searchParams.set("fields", "rating,user_ratings_total,reviews,url");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== "OK" || !data.result) return null;

    const result = data.result as {
      rating?: number;
      user_ratings_total?: number;
      url?: string;
      reviews?: Array<{
        author_name: string;
        profile_photo_url?: string;
        rating: number;
        text: string;
        relative_time_description: string;
        time: number;
      }>;
    };

    if (typeof result.rating !== "number") return null;

    return {
      rating: result.rating,
      reviewCount: result.user_ratings_total ?? 0,
      mapsUrl: result.url ?? "https://www.google.com/maps",
      reviews: (result.reviews ?? []).map((r) => ({
        author: r.author_name,
        authorPhoto: r.profile_photo_url ?? null,
        rating: r.rating,
        text: r.text,
        relativeTime: r.relative_time_description,
        time: r.time,
      })),
    };
  } catch {
    return null;
  }
}
