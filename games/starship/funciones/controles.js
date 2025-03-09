
window.addEventListener("keydown", onKeyDown);
        window.addEventListener("keyup", onKeyUp);
function onKeyDown(e) {
          if (e.key === "a") {
            gira1 = -1;
          } else if (e.key === "d") {
            gira1 = 1;
          } else if (e.key === "w") {
            avanza1 = true;
				
          } else if (e.keyCode === 32) {
            disparar1 = true;
          } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            gira2 = (e.key === "ArrowLeft") ? -1 : 1;
          } else if (e.key === "ArrowUp") {
            avanza2 = true;
          } else if (e.keyCode === 189) {
            disparar2 = true;
          }
        }

        function onKeyUp(e) {
          if (e.key === "a" || e.key === "d") {
            gira1 = 0;
          } else if (e.key === "w") {
            avanza1 = false;
          } else if (e.keyCode === 32) {
            disparar1 = false;
          } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            gira2 = 0;
          } else if (e.key === "ArrowUp") {
            avanza2 = false;
          } else if (e.keyCode === 189) {
            disparar2 = false;
          }
        }
