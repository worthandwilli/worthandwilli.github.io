// Worthathon schedule — Eastern Time.
// August is EDT (UTC-4), so these timestamps are explicit and won't shift by viewer location.
const START = new Date("2026-08-20T20:00:00-04:00");
const GUARANTEED_END = new Date("2026-08-21T08:00:00-04:00");
const HARD_END = new Date("2026-08-21T22:00:00-04:00");

const els = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
  status: document.getElementById("eventStatus")
};

function pad(n){
  return String(Math.max(0, n)).padStart(2, "0");
}

function splitDuration(ms){
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60
  };
}

function renderDuration(ms){
  const t = splitDuration(ms);
  els.days.textContent = pad(t.days);
  els.hours.textContent = pad(t.hours);
  els.minutes.textContent = pad(t.minutes);
  els.seconds.textContent = pad(t.seconds);
}

function updateCountdown(){
  const now = new Date();

  if(now < START){
    els.status.textContent = "Starts in";
    renderDuration(START - now);
    return;
  }

  if(now < GUARANTEED_END){
    els.status.textContent = "Guaranteed stream time remaining";
    renderDuration(GUARANTEED_END - now);
    return;
  }

  if(now < HARD_END){
    els.status.textContent = "Worthathon bonus / final window";
    renderDuration(HARD_END - now);
    return;
  }

  els.status.textContent = "Worthathon complete";
  renderDuration(0);
}

updateCountdown();
setInterval(updateCountdown, 1000);
