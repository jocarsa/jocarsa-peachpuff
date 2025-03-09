function checkCollisions(player1, player2) {
          for (let i = player1.proyectiles.length - 1; i >= 0; i--) {
            const proyectil = player1.proyectiles[i];
            const dx = proyectil.posx - player2.posx;
            const dy = proyectil.posy - player2.posy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
              player1.proyectiles.splice(i, 1);
              window.location.reload();
            }
          }

          for (let i = player2.proyectiles.length - 1; i >= 0; i--) {
            const proyectil = player2.proyectiles[i];
            const dx = proyectil.posx - player1.posx;
            const dy = proyectil.posy - player1.posy;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 10) {
              player2.proyectiles.splice(i, 1);
              window.location.reload();
            }
          }
        }