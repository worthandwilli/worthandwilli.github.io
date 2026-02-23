const commands = [
  { cmd: "/quests", desc: "Open the quests menu and quest categories.", tags: ["Quests"] },
  { cmd: "/mcmmogui", desc: "Open the mcMMO GUI to track skills.", tags: ["mcMMO","Skills"] },
  { cmd: "/jobs", desc: "Open the Jobs GUI.", tags: ["Jobs","Money"] },

  { cmd: "/spawn", desc: "Teleport to spawn.", tags: ["Travel"] },
  { cmd: "/sethome <name>", desc: "Set a home location.", tags: ["Homes"] },
  { cmd: "/home <name>", desc: "Teleport to a home.", tags: ["Homes"] },

  { cmd: "/rtp", desc: "Random teleport.", tags: ["Travel"] },
  { cmd: "/tpa <player>", desc: "Request teleport to a player.", tags: ["TPA"] },
  { cmd: "/tpaccept", desc: "Accept a teleport request.", tags: ["TPA"] },

  { cmd: "/bal", desc: "Check your balance.", tags: ["Money"] },
  { cmd: "/baltop", desc: "View top balances.", tags: ["Money"] },

  { cmd: "/claim", desc: "Create a land claim.", tags: ["Claims"] },
  { cmd: "/trust <player>", desc: "Trust a player in your claim.", tags: ["Claims"] },
  { cmd: "/abandonclaim", desc: "Delete your claim.", tags: ["Claims"] },

  { cmd: "/cosmetics", desc: "Open the cosmetics menu.", tags: ["Cosmetics"] },

  /* Death & Recovery */
  { cmd: "/graves tp", desc: "Teleport back to your gravestone after death.", tags: ["Graves","Death"] },

  /* VIP */
  { cmd: "/trash", desc: "Open remote trash bin (VIP).", tags: ["VIP"] },
  { cmd: "/garbage", desc: "Open remote trash bin (VIP).", tags: ["VIP"] },
  { cmd: "/boop <player>", desc: "Boop another player (VIP).", tags: ["VIP","Fun"] },
  { cmd: "/bfc <player>", desc: "Banish a player from your claim (VIP).", tags: ["VIP","Claims"] },
  { cmd: "/veinminer toggle", desc: "Toggle VeinMiner (VIP).", tags: ["VIP","Mining"] },
  { cmd: "/shrug", desc: "Shrug in chat (VIP).", tags: ["VIP","Chat"] },

  /* Ranks */
  { cmd: "/shushwand", desc: "Get shush wand to silence mobs (Big Willies).", tags: ["VIP","Fun"] },
  { cmd: "/hdb", desc: "Open Head Database (SuperWillies).", tags: ["VIP","Cosmetics"] },
  { cmd: "/nv", desc: "Toggle Night Vision (SuperWillies).", tags: ["VIP"] },
  { cmd: "/as", desc: "Toggle AutoSmelt (SuperWillies).", tags: ["VIP","Mining"] },

  /* Booster */
  { cmd: "/fly", desc: "Fly inside your own claims (Discord Booster).", tags: ["Booster"] },
];

const grid = document.getElementById("cmdGrid");
const search = document.getElementById("cmdSearch");

function render(list){
  grid.innerHTML = "";
  if(list.length === 0){
    grid.innerHTML = "<p class='note'>No matching commands.</p>";
    return;
  }

  list.forEach(c=>{
    const div = document.createElement("div");
    div.className = "cmd";
    div.innerHTML = `
      <b><code>${c.cmd}</code></b>
      <p>${c.desc}</p>
      <div class="tags">
        ${c.tags.map(t=>`<span class="tag">${t}</span>`).join("")}
      </div>
    `;
    grid.appendChild(div);
  });
}

render(commands);

search.addEventListener("input", ()=>{
  const q = search.value.toLowerCase();
  const filtered = commands.filter(c =>
    c.cmd.toLowerCase().includes(q) ||
    c.desc.toLowerCase().includes(q) ||
    c.tags.join(" ").toLowerCase().includes(q)
  );
  render(filtered);
});
