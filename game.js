$(document).ready(function() {
    var canevas = document.getElementById("drawing")
    var ctx = canevas.getContext("2d")

    function Cible(couleur, taille, posX, posY) {
        this.couleur = couleur;
        this.hauteur = taille;
        this.largeur = taille;
        this.positionX = posX;
        this.positionY = posY;
        this.contient = function(x, y) {
            return (x >= this.positionX && x <= (this.positionX + this.largeur)) && (y >= this.positionY && y <= (this.positionY + this.hauteur));
        };
    }
    
    var cibles = Array();
    cibles.push(new Cible('#f00', 80, 350, 200));
    cibles.push(new Cible('#0f0', 80, 405, 100));
    cibles.push(new Cible('#e4e', 100, 200, 100));

    dessinerCanevas(ctx);

    $("#drawing").mousedown(function(evenement) {
        var sourisX,
            sourisY;
        
        sourisX = evenement.clientX;
        sourisY = evenement.clientY;
        
        sourisX -= this.offsetLeft;
        sourisY -= this.offsetTop;

        for (cible in cibles) {
            var cible1 = cibles[cible];
            if (cible1.contient(sourisX, sourisY)) {
                alert("Bravo !");
                cibles.pop(cible1);
                dessinerCanevas(ctx);
                return;
            }
        }
        alert("Perdu hahaha ! Recommencez.");
    });
    
    function dessinerCanevas(ctx) {
        ctx.clearRect(0, 0, 768, 400);
        for (cible in cibles) {
            var cibleCourante = cibles[cible];
            dessinerCible(ctx, cibleCourante);
        }
    }

    function dessinerCible(ctx, cible) {
        ctx.fillStyle = cible.couleur;
        ctx.fillRect(cible.positionX, cible.positionY, cible.largeur, cible.hauteur);
    }
});