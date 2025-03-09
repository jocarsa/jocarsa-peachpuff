// js/ajax.js

// Function to send the player's update to the server
function sendPlayerUpdate(playerData) {
  fetch('update.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(playerData)
  })
    .then(response => response.json())
    .then(data => {
      console.log("Update response:", data);
    })
    .catch(err => console.error("Update error:", err));
}

// Global object to store remote players' state for interpolation
window.remotePlayersInterp = {};

// Poll remote players every 250ms (fewer connections per second)
setInterval(fetchPlayers, 250);

function fetchPlayers() {
  fetch('fetch.php')
    .then(response => response.json())
    .then(players => {
      const now = Date.now();
      players.forEach(function (player) {
        // Skip the local player
        if (player.id === uniqueID) return;
        
        // If we already have an entry, update its previous and target states.
        if (window.remotePlayersInterp[player.id]) {
          let entry = window.remotePlayersInterp[player.id];
          // Save the old target as previous state (including bullets)
          entry.prev = {
            posx: entry.target.posx,
            posy: entry.target.posy,
            rotation: entry.target.rotation,
            bullets: entry.target.bullets
          };
          // Set the new target state (include bullets from server)
          entry.target = {
            posx: player.posx,
            posy: player.posy,
            rotation: player.rotation,
            color: player.color,
            bullets: player.projectiles  // remote bullets array
          };
          entry.lastUpdate = now;
        } else {
          // Otherwise, create a new entry with initial state
          window.remotePlayersInterp[player.id] = {
            prev: {
              posx: player.posx,
              posy: player.posy,
              rotation: player.rotation,
              bullets: player.projectiles
            },
            target: {
              posx: player.posx,
              posy: player.posy,
              rotation: player.rotation,
              color: player.color,
              bullets: player.projectiles
            },
            lastUpdate: now
          };
        }
      });
    })
    .catch(err => console.error("Fetch error:", err));
}

