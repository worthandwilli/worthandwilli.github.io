const commands = [
  // Quests / Story
  { cmd: "/quests", desc: "Open the Quests menu (categories like Oasis).", tags: ["Quests", "Story"] },
  { cmd: "/quest", desc: "Alias for opening quests on some setups (if enabled).", tags: ["Quests", "Story"] },

  // mcMMO / Skills
  { cmd: "/mcmmogui", desc: "Open the mcMMO GUI to track skills and progress.", tags: ["Skills", "mcMMO"] },

  // Jobs
  { cmd: "/jobs", desc: "Open Jobs menu / GUI and manage jobs.", tags: ["Jobs", "Money"] },
  { cmd: "/jobs join <job>", desc: "Join a job (ex: /jobs join Farmer).", tags: ["Jobs", "Money"] },
  { cmd: "/jobs leave <job>", desc: "Leave a job.", tags: ["Jobs", "Money"] },

  // Travel / Essentials basics (common)
  { cmd: "/spawn", desc: "Teleport to spawn.", tags: ["Travel"] },
  { cmd: "/sethome <name>", desc: "Set a home location.", tags: ["Homes", "Travel"] },
  { cmd: "/home <name>", desc: "Teleport to a saved home.", tags: ["Homes", "Travel"] },
  { cmd: "/delhome <name>", desc: "Delete a home.", tags: ["Homes", "Travel"] },

  // RTP / TPA
  { cmd: "/rtp", desc: "Random teleport (WildRTP / server RTP system).", tags: ["Travel", "RTP"] },
  { cmd: "/tpa <player>", desc: "Request to teleport to a player.", tags: ["Travel", "TPA"] },
  { cmd: "/tpahere <player>", desc: "Request a player to teleport to you.", tags: ["Travel", "TPA"] },
  { cmd: "/tpaccept", desc: "Accept a teleport request.", tags: ["Travel", "TPA"] },
  { cmd: "/tpdeny", desc: "Deny a teleport request.", tags: ["Travel", "TPA"] },

  // Economy
  { cmd: "/bal", desc: "Check your balance.", tags: ["Money"] },
  { cmd: "/baltop", desc: "View top balances.", tags: ["Money"] },

  // Claims (GriefPrevention common commands)
  { cmd: "/claim", desc: "Create a claim (if your server uses the /claim command).", tags: ["Claims", "Protection"] },
  { cmd: "/trust <player>", desc: "Allow someone to build in your claim.", tags: ["Claims", "Protection"] },
  { cmd: "/untrust <player>", desc: "Remove someone's permission from your claim.", tags: ["Claims", "Protection"] },
  { cmd: "/abandonclaim", desc: "Delete the claim you are standing in.", tags: ["Claims", "Protection"] },
  { cmd: "/claimslist", desc: "List your claims (if enabled).", tags: ["Claims", "Protection"] },

  // Shops / Trading
  { cmd: "/ah", desc: "Open Auction House (AxAuctions).", tags: ["Shops", "Trading"] },
  { cmd: "/trade <player>", desc: "Start a safe trade (AxTrade).", tags: ["Trading"] },
  { cmd: "/qs", desc: "QuickShop commands/help (varies by config).", tags: ["Shops"] },

  // Cosmetics / Fun
  { cmd: "/cosmetics", desc: "Open cosmetics menu (ProCosmetics).", tags: ["Cosmetics", "Fun"] },
  { cmd: "/sit", desc: "Sit down (GSit).", tags: ["Fun"] },
  { cmd: "/lay", desc: "Lay down (GSit).", tags: ["Fun"] },

  // Utility
  { cmd: "/help", desc: "View command help pages.", tags: ["Utility"] },
];

function render(list) {
  const grid = document.getElementById("cmdGrid");
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<div class="cmd"><b>No matches.</b><p class="note">Try searching “claim”, “jobs”, “rtp”, or “cosmetics”.</p></div>`;
    return;
  }

  for (const item of list) {
    const el = document.createElement("div");
    el.className = "cmd";
    el.innerHTML = `
      <div class="title">
        <b><code>${escapeHtml(item.cmd)}</code></b>
      </div>
      <p>${escapeHtml(item.desc)}</p>
      <div class="tags">
        ${item.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
      </div>
    `;
    grid.appendChild(el);
  }
}

function escapeHtml(str){
  return str.replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

render(commands);

const input = document.getElementById("cmdSearch");
input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  if (!q) return render(commands);

  const filtered = commands.filter(c =>
    c.cmd.toLowerCase().includes(q) ||
    c.desc.toLowerCase().includes(q) ||
    c.tags.join(" ").toLowerCase().includes(q)
  );
  render(filtered);
});
