// WebSocket connection
      const socket = new WebSocket("wss://jotauve.es:3000");

      socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened");
      });

      socket.addEventListener("error", (event) => {
        console.error("WebSocket error:", event);
      });

      socket.addEventListener("message", (event) => {
       // Parse incoming data once
    let datos;
    try {
        datos = JSON.parse(event.data);
    } catch (e) {
        console.error("Error parsing JSON:", e);
        return;
    }
    
    // Check if datos is an array
    if (Array.isArray(datos)) {
        datos = datos.map(item => {
            try {
                return JSON.parse(item); // Parse each item in the array
            } catch (e) {
                console.error("Error parsing item:", e);
                return null;
            }
        }).filter(item => item !== null); // Filter out any null items due to parsing errors
    }
        
		
        
        if(document.getElementById(datos.usuario)){
                  //console.log("existe")
                    document.getElementById(datos.usuario).innerHTML = datos.usuario+":"+datos.puntos
                }else{
                    console.log("no existe")
                    let elemento = document.createElement("div")
                    elemento.id = datos.usuario
                    elemento.style.color = datos.color
                    //console.log(datos.color)
                    document.getElementById("jugadores").appendChild(elemento)
                }
        
        console.log(datos);
        
        datos.forEach(function(elemento){
        console.
            elemento = JSON.parse(elemento)
        })
          //contexto.clearRect(0, 0, window.innerWidth, window.innerHeight)
          contexto.fillStyle = "rgba(0,0,0,0.2)"
          contexto.fillRect(0, 0, anchura, altura)
          jugador1.dibuja();
          if(datos.position.x != jugador1.posx ){
             
              
                contexto.save();
                contexto.translate(datos.position.x, datos.position.y);
              contexto.rotate(datos.rotation);
          contexto.fillStyle = datos.color;
		  contexto.strokeStyle = datos.color;
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
          contexto.fillStyle = "white";
          contexto.beginPath();
          contexto.arc(0, 0, 2, 0, Math.PI * 2, true);
          contexto.closePath();
          contexto.fill();

          contexto.restore();
              
              
              
              //console.log(datos.projectiles)
              for(let i = 0;i<datos.projectiles.length;i++){
                  //console.log("bala")
                  contexto.strokeStyle = datos.projectiles[i].color
                  contexto.fillStyle = datos.projectiles[i].color
                  contexto.lineWidth = 1;
                  contexto.beginPath()
                  /*contexto.arc(
                      datos.projectiles[i].posx,
                      datos.projectiles[i].posy,
                      3,0,Math.PI*2,true)
                contexto.fill()*/
                  contexto.strokeStyle = datos.projectiles[i].color;
                  contexto.moveTo(datos.projectiles[i].posx, datos.projectiles[i].posy)
                    contexto.lineTo(
                        datos.projectiles[i].posx+Math.cos(datos.projectiles[i].angle+Math.PI/2)*10,
                        datos.projectiles[i].posy+Math.sin(datos.projectiles[i].angle+Math.PI/2)*10
                    )
                  contexto.stroke();
                   
                  if (checkPlayerProjectileCollision(jugador1, datos.projectiles[i]) && jugador1.color != datos.projectiles[i].color) {
                    // Collision detected, handle it here
                        console.log("Collision detected between player and projectile");
                           //window.location = window.location
                      jugador1.puntos--
                      console.log(jugador1.puntos)
                      jugador1.posx = Math.random() * anchura;
                        jugador1.posy = Math.random() * altura;
                  }
                  
              }
        }
          
          
      });
