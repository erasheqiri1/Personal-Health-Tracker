// services/moodGif.js

const TENOR_API_KEY = "VENDOSE_KETU_TENOR_API_KEY"; // ⚠️ Nxirre key nga Tenor Developers
const TENOR_BASE_URL = "https://g.tenor.com/v1/search";

/**
 * Kthen një GIF URL nga Tenor për një mood:
 * mood: "happy" | "tired" | "hungry" | "motivated"
 */
export async function getMoodGif(mood) {
  if (!TENOR_API_KEY || TENOR_API_KEY === "VENDOSE_KETU_TENOR_API_KEY") {
    console.warn("TENOR_API_KEY mungon – vendose key-in tënd.");
    return null;
  }

  const query = encodeURIComponent(`${mood} anime reaction`);

  const url =
    `${TENOR_BASE_URL}?q=${query}` +
    `&key=${TENOR_API_KEY}` +
    `&limit=1&media_filter=minimal&contentfilter=medium`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Tenor API error: " + res.status);
  }

  const data = await res.json();
  if (!data.results || !data.results.length) return null;

  const gifObj = data.results[0];
  const firstMedia = gifObj.media && gifObj.media[0];

  let gifUrl = null;
  if (firstMedia) {
    if (firstMedia.tinygif && firstMedia.tinygif.url) {
      gifUrl = firstMedia.tinygif.url;
    } else if (firstMedia.gif && firstMedia.gif.url) {
      gifUrl = firstMedia.gif.url;
    }
  }

  if (!gifUrl) return null;

  return {
    id: gifObj.id,
    url: gifUrl,
    title: gifObj.title || mood,
  };
}
