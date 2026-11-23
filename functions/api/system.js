export async function onRequestGet(context) {
  const { request, env } = context;
  const passcode = new URL(request.url).searchParams.get("passcode");

  if (passcode !== env.SYSTEM_PASSCODE) {
    return new Response("Invalid passcode", { status: 401 });
  }

  const { results } = await env.DB.prepare(
    "SELECT * FROM days ORDER BY date DESC LIMIT 30"
  ).all();

  const html = results.map(day => `
    <div class="day">
      <strong>${day.date}</strong> — ${day.theme || ""}
      ${day.highlight ? `<br>Highlight: ${day.highlight}` : ""}
      ${day.wins ? `<br>Wins: ${day.wins}` : ""}
      ${day.thanks ? `<br>Thanks: ${day.thanks}` : ""}
    </div>
  `).join("");

  return new Response(html || "<p>No days yet</p>", {
    headers: { "Content-Type": "text/html" }
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const form = await request.formData();
  const passcode = form.get("passcode");

  if (passcode !== env.SYSTEM_PASSCODE) {
    return new Response("Invalid passcode", { status: 401 });
  }

  const date = form.get("date");
  const day_type = form.get("day_type");
  const theme = form.get("theme");
  const energy_level = form.get("energy_level") || null;
  const step_count = form.get("step_count") || 10000;
  const highlight = form.get("highlight") || null;
  const wins = form.get("wins") || null;
  const thanks = form.get("thanks") || null;
  const notes = form.get("notes") || null;

  await env.DB.prepare(`
    INSERT INTO days (date, day_type, theme, energy_level, step_count, highlight, wins, thanks, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(date) DO UPDATE SET
      day_type = excluded.day_type,
      theme = excluded.theme,
      energy_level = excluded.energy_level,
      step_count = excluded.step_count,
      highlight = excluded.highlight,
      wins = excluded.wins,
      thanks = excluded.thanks,
      notes = excluded.notes
  `).bind(date, day_type, theme, energy_level, step_count, highlight, wins, thanks, notes).run();

  return new Response(`<p>Saved ${date}</p>`, {
    headers: { "Content-Type": "text/html" }
  });
}