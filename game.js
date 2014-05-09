$(document).ready(function() {
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

    function World(canevas, cibles) {
        var canvas = $(canevas);
        var ctx = canevas.getContext("2d");

        function dessinerCanevas() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            for (cible in cibles) {
                var cibleCourante = cibles[cible];
                dessinerCible(cibleCourante);
            }
        };
        function dessinerCible(cible) {
            ctx.fillStyle = cible.couleur;
            ctx.fillRect(cible.positionX, cible.positionY, cible.largeur, cible.hauteur);
        }
        function run() {
            dessinerCanevas();
        }

        canvas.mousedown(function(evenement) {
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
                    cibles.splice(cible, 1);
                    dessinerCanevas();
                    return;
                }
            }
            alert("Perdu hahaha ! Recommencez.");
        });

        return {
          run: run
        };
    }

    var canevas = document.getElementById("drawing");
    var targets = [
        new Cible('#f00', 80, 350, 200),
        new Cible('#0f0', 80, 405, 100),
        new Cible('#e4e', 100, 200, 100)
    ];
    
    var world = new World(canevas, targets);
    world.run();
});
