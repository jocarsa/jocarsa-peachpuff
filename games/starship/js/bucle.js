// js/bucle.js

// Helper function: Linear interpolation between a and b by factor t
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// Main animation/update loop using requestAnimationFrame
function update() {
  // Clear the canvas completely
  contexto.fillStyle = "black";
  contexto.fillRect(0, 0, anchura, altura);
  
  // Update the local player's state:
  jugador1.gira(gira1);
  if (avanza1) {
    jugador1.avanza();
  }
  jugador1.applyInertia();
  if (disparar1) {
    jugador1.fireProjectile();
  }
  jugador1.dibujaProyectiles();
  
  // Get the current time for interpolation calculations
  const now = Date.now();
  // Polling interval used in ajax.js (250ms)
  const interval = 250;
  
  // Draw each remote player's ship and bullets with interpolation
  for (let id in window.remotePlayersInterp) {
    let entry = window.remotePlayersInterp[id];
    let t = (now - entry.lastUpdate) / interval;
    if (t > 1) t = 1; // Clamp t to 1
    
    // Interpolate ship position and rotation
    const interpPosX = lerp(entry.prev.posx, entry.target.posx, t);
    const interpPosY = lerp(entry.prev.posy, entry.target.posy, t);
    const interpRotation = lerp(entry.prev.rotation, entry.target.rotation, t);
    const color = entry.target.color;
    
    // Draw the remote player's ship
    contexto.save();
    contexto.translate(interpPosX, interpPosY);
    contexto.rotate(interpRotation);
    contexto.fillStyle = color;
    contexto.strokeStyle = color;
    contexto.beginPath();
    contexto.moveTo(0, -10);
    contexto.lineTo(-5, 5);
    contexto.lineTo(5, 5);
    contexto.closePath();
    contexto.fill();
    contexto.restore();
    
    // Draw remote player's bullets (if any)
    if (entry.target.bullets && Array.isArray(entry.target.bullets)) {
      for (let i = 0; i < entry.target.bullets.length; i++) {
        let bulletTarget = entry.target.bullets[i];
        // Attempt to interpolate bullet position if previous data exists
        let bulletPrev = (entry.prev.bullets && entry.prev.bullets[i]) ? entry.prev.bullets[i] : null;
        let interpBulletX, interpBulletY;
        if (bulletPrev) {
          interpBulletX = lerp(bulletPrev.posx, bulletTarget.posx, t);
          interpBulletY = lerp(bulletPrev.posy, bulletTarget.posy, t);
        } else {
          interpBulletX = bulletTarget.posx;
          interpBulletY = bulletTarget.posy;
        }
        contexto.save();
        // Use the bullet's color if provided; otherwise, use the player's color
        contexto.strokeStyle = bulletTarget.color || color;
        contexto.fillStyle = bulletTarget.color || color;
        // Draw the bullet as a small circle
        contexto.beginPath();
        contexto.arc(interpBulletX, interpBulletY, 3, 0, Math.PI * 2);
        contexto.fill();
        contexto.restore();
        
        // Check collision between local player and this remote bullet.
        // We assume your collision detection function accepts an object with posx and posy.
        if (typeof checkPlayerProjectileCollision === "function") {
          if (checkPlayerProjectileCollision(jugador1, { posx: interpBulletX, posy: interpBulletY }) && jugador1.color !== (bulletTarget.color || color)) {
            console.log("Collision detected with remote bullet");
            jugador1.puntos--;
            // Optionally, reposition the local player after a hit:
            jugador1.posx = Math.random() * anchura;
            jugador1.posy = Math.random() * altura;
          }
        }
      }
    }
  }
  
  // Draw the local player's ship on top of everything
  jugador1.dibuja();
  
  // Send the local player's updated state to the server
  const playerData = {
    position: jugador1.getPosition(),
    rotation: jugador1.getRotation(),
    projectiles: jugador1.getProjectiles(),
    color: micolor,
    puntos: jugador1.getPuntos(),
    id: uniqueID,
    usuario: usuario
  };
  sendPlayerUpdate(playerData);
  
  // Continue the loop
  requestAnimationFrame(update);
}

// Start the game loop when the player clicks "Enter"
document.getElementById("enviar").onclick = function () {
  usuario = document.getElementById("usuario").value;
  micolor = document.getElementById("color").value;
  document.getElementById("inicio").style.display = "none";
  jugador1.color = micolor;
  
  // Start the animation loop
  requestAnimationFrame(update);
};

