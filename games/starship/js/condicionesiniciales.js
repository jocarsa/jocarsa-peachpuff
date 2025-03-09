var anchura = 1920/2
var altura = 1080/2
        // Generate or retrieve a unique ID for the player
      let uniqueID = localStorage.getItem("uniqueID");
      if (!uniqueID) {
        uniqueID = generateUniqueID();
        localStorage.setItem("uniqueID", uniqueID);
      }
        const lienzoestrellas =  document.getElementById("lienzoestrellas")
        const contextoestrellas = lienzoestrellas.getContext("2d")
        lienzoestrellas.width = anchura;
        lienzoestrellas.height = altura;
contextoestrellas.fillStyle = "grey"
    for(let i = 0;i<1000;i++){
        contextoestrellas.fillRect(
            Math.random()*anchura,
             Math.random()*altura,
            1,1
        )
    }
        
      const lienzo = document.getElementById("lienzo");
      const contexto = lienzo.getContext("2d");
      lienzo.width = anchura;
      lienzo.height = altura;
        
      const jugador1 = new Nave(getRandomHexColor());
      jugador1.dibuja();

      var gira1 = 0;
      var avanza1 = false;
      var disparar1 = false;
var usuario = "";
var micolor = "#ffffff"