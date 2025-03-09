class Nave {
        constructor(color) {
          this.posx = Math.random() * anchura;
          this.posy = Math.random() * altura;
          this.rot = Math.random() * Math.PI * 2;
          this.color = micolor;
          this.velocityX = 0;
          this.velocityY = 0;
          this.angularVelocity = 0;
          this.acceleration = 0.1;
          this.angularAcceleration = 0.01;
          this.proyectiles = [];
          this.lastProjectileTime = 0;
            this.puntos = 100
        }
        dibuja() {
          contexto.save();
          contexto.translate(this.posx, this.posy);
          this.rot += this.angularVelocity;

          // Wrap around on the X-axis
          if (this.posx < 0) {
            this.posx = anchura;
          } else if (this.posx > anchura) {
            this.posx = 0;
          }

          // Wrap around on the Y-axis
          if (this.posy < 0) {
            this.posy = altura;
          } else if (this.posy > altura) {
            this.posy = 0;
          }

          this.posx += this.velocityX;
          this.posy += this.velocityY;
          contexto.rotate(this.rot);
          contexto.fillStyle = this.color;
            contexto.strokeStyle = this.color;
            contexto.lineWidth = 0.5;
          contexto.beginPath();

          const x1 = 0;
          const y1 = -10;
          const x2 = -5;
          const y2 = 5;
          const x3 = 5;
          const y3 = 5;

          contexto.moveTo(x1, y1);
          contexto.lineTo(x2, y2);
          contexto.lineTo(x3, y3);
          contexto.closePath();
          contexto.fill();
          contexto.fillStyle = "black";
          contexto.beginPath();
          contexto.arc(0, 0, 2, 0, Math.PI * 2, true);
          contexto.closePath();
          //contexto.fill();
           contexto.strokeStyle = this.color;
            contexto.beginPath();
            contexto.arc(0,0,8,0,Math.PI*2,true)
            contexto.stroke();
			contexto.closePath();
			
			

          contexto.restore();
        }
        avanza() {
          this.velocityX += Math.cos(this.rot - Math.PI / 2) * this.acceleration / 2;
          this.velocityY += Math.sin(this.rot - Math.PI / 2) * this.acceleration / 2;
        }
        gira(direction) {
          this.angularVelocity += direction * this.angularAcceleration / 10;
        }
        applyInertia() {
          this.velocityX *= 0.99;
          this.velocityY *= 0.99;
          this.angularVelocity *= 0.99;
        }
        dibujaProyectiles() {
			contexto.strokeStyle = this.color;
          for (let i = this.proyectiles.length - 1; i >= 0; i--) {
            const proyectil = this.proyectiles[i];
            proyectil.move();
            proyectil.dibuja();

            // Remove projectiles that go out of the canvas
            if (
              proyectil.posx < 0 ||
              proyectil.posx > anchura ||
              proyectil.posy < 0 ||
              proyectil.posy > altura
            ) {
              this.proyectiles.splice(i, 1);
            }
          }
        }
        fireProjectile() {
          const currentTime = Date.now();
          if (currentTime - this.lastProjectileTime >= 500) {
            const velocityX = Math.cos(this.rot - Math.PI / 2);
            const velocityY = Math.sin(this.rot - Math.PI / 2);
            this.proyectiles.push(new Proyectil(this.posx, this.posy, this.rot, velocityX, velocityY, this.color));
            this.lastProjectileTime = currentTime;
          }
        }
    getPosition() {
        return { x: this.posx, y: this.posy };
      }
    getRotation() {
    return this.rot;
  }
    getPuntos() {
    return this.puntos;
  }
    getColor() {
    return this.color;
  }

  getProjectiles() {
    return this.proyectiles;
  }
    // Method to set the position of the ship
  setPosition(x, y) {
    this.posx = x;
    this.posy = y;
  }

  // Method to set the rotation of the ship
  setRotation(rotation) {
    this.rot = rotation;
  }

  // Method to set the projectiles for the ship
  setProjectiles(projectiles) {
    this.proyectiles = projectiles;
  }
  
  distanceTo(otherNave) {
        const dx = this.posx - otherNave.posx;
        const dy = this.posy - otherNave.posy;
        return Math.sqrt(dx * dx + dy * dy);
    }
	
	// Method to find the closest player/NPC
    findClosestPlayer(players) {
        let closest = null;
        let closestDistance = Infinity;

        players.forEach(player => {
            const distance = this.distanceTo(player);
            if (distance < closestDistance) {
                closest = player;
                closestDistance = distance;
            }
        });

        return closest;
    }
	
	// Method to rotate towards a target
    rotateTowards(target) {
        const angleToTarget = Math.atan2(target.posy - this.posy, target.posx - this.posx);
        this.rot = angleToTarget;
    }
	
}
