function getRandomHexColor() {
  // Generate a random number between 0 and 16777215 (corresponding to #000000 to #FFFFFF)
  const randomColor = Math.floor((Math.random() * 8388607)+8388607).toString(16);
  
  // Ensure the color has 6 digits by padding with zeros if needed
  const hexColor = '#' + ('000000' + randomColor).slice(-6);
  
  return hexColor;
}

function checkPlayerProjectileCollision(player, projectile) {
  const dx = player.posx - projectile.posx;
  const dy = player.posy - projectile.posy;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Define a collision threshold, e.g., 10 pixels
  const collisionThreshold = 10;

  return distance < collisionThreshold;
}

 function generateUniqueID() {
    // You can use various browser data to generate a unique ID
    const navigatorInfo = `${navigator.userAgent}${navigator.language}${navigator.platform}`;
    const screenInfo = `${screen.width}${screen.height}${screen.colorDepth}`;
    const id = btoa(navigatorInfo + screenInfo);
    return id;
    }