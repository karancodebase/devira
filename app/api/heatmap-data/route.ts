// app/api/heatmap/route.ts
import { NextResponse } from "next/server";

/**
 * Defines the shape of a GitHub event we're interested in.
 */
interface GitHubEvent {
  created_at: string;
}

/**
 * Handles POST requests to fetch and convert GitHub contribution data.
 */
export async function POST() {
  // 1. Fetch the user's public events from GitHub
  const ghResponse = await fetch(
    "https://api.github.com/users/karancodebase/events/public"
  );                                              // :contentReference[oaicite:7]{index=7} :contentReference[oaicite:8]{index=8}

  // 2. Parse JSON array of events
  const events: GitHubEvent[] = await ghResponse.json(); // :contentReference[oaicite:9]{index=9}

  // 3. Aggregate counts per day into a Map<date, count>
  const days = new Map<string, number>();
  events.forEach((evt) => {
    const day = evt.created_at.slice(0, 10);
    days.set(day, (days.get(day) || 0) + 1);
  });                                              // :contentReference[oaicite:10]{index=10}

  // 4. Convert Map to array of { date, count }
  const values: { date: string; count: number }[] = 
    Array.from(days.entries())                      // :contentReference[oaicite:11]{index=11}
      .map(([date, count]) => ({ date, count }));   // :contentReference[oaicite:12]{index=12} :contentReference[oaicite:13]{index=13}

  // 5. Return as JSON for your heatmap component
  return NextResponse.json({ values });
}
