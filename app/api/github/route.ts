 
import { NextRequest, NextResponse } from "next/server";

interface GitHubEvent {
  type: string;
  created_at: string;
}
export async function POST(req: NextRequest) {
  try {

  const  {searchParams} = new URL(req.url)

  const username = searchParams.get("username")
    const res = await fetch(
      `https://api.github.com/users/${username}/events/public` , {
        
      }
    );
    const events: GitHubEvent[] = await res.json();  
    const days = new Map<string, number>();
    events.forEach(evt => {
      const day = evt.created_at.slice(0, 10);
      days.set(day, (days.get(day) || 0) + 1);
    });
  
    // Sort dates and compute streaks
    const sorted = Array.from(days.keys()).sort();
    let current = 0, max = 0, prevTime = 0;
    const todayKey = new Date().toISOString().slice(0, 10);
  
    for (const dateStr of sorted) {
      if (days.get(dateStr)! > 0) {
        const t = new Date(dateStr).getTime();
        if (prevTime && t - prevTime === 86400000) {
          current++;
        } else {
          current = 1;
        }
        prevTime = t;
        if (current > max) max = current;
      }
    }
  
    const currentStreak = sorted[sorted.length - 1] === todayKey ? current : 0;
     
 
    return NextResponse.json({currentStreak , maxStreak: max });
  } catch (error) {
    return NextResponse.json(error);
  }
}
