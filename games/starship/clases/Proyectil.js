class Proyectil {
        constructor(x, y, angle, velocityX, velocityY, color) {
          this.posx = x;
          this.posy = y;
          this.angle = angle;
          this.velocityX = velocityX;
          this.velocityY = velocityY;
          this.color = color;
          this.speed = 3;
        }
        move() {
          this.posx += this.velocityX * this.speed;
          this.posy += this.velocityY * this.speed;
        }
        dibuja() {
          contexto.fillStyle = this.color;
          contexto.beginPath();
          //contexto.arc(this.posx, this.posy, 2, 0, Math.PI * 2, true);
          //contexto.closePath();
            contexto.moveTo(this.posx, this.posy)
            contexto.lineTo(
                this.posx+Math.cos(this.angle+Math.PI/2)*10,
                this.posy+Math.sin(this.angle+Math.PI/2)*10
            )
          contexto.stroke();
        }
      }