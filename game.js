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
        this.canvas = $(canevas);
        this.ctx = canevas.getContext("2d");
        this.cibles = cibles;

        this.dessinerCanevas = function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            for (cible in this.cibles) {
                var cibleCourante = this.cibles[cible];
                this.dessinerCible(cibleCourante);
            }
        };
        this.dessinerCible = function(cible) {
            this.ctx.fillStyle = cible.couleur;
            this.ctx.fillRect(cible.positionX, cible.positionY, cible.largeur, cible.hauteur);
        }
        this.run = function() {
            this.dessinerCanevas();
        }

        this.canvas.mousedown(function(evenement) {
            var sourisX,
                sourisY;
            
            sourisX = evenement.clientX;
            sourisY = evenement.clientY;

            sourisX -= this.offsetLeft;
            sourisY -= this.offsetTop;

            for (cible in cibles) {
                var cible1 = cibles[cible];
                alert("posY:" + cible1.positionY + " sourisY:" + sourisY);
                if (cible1.contient(sourisX, sourisY)) {
                    alert("Bravo !");
                    cibles.splice(cible, 1);
                    // TODO: comment appeler la méthode de World?
                    dessinerCanevas();
                    return;
                }
            }
            alert("Perdu hahaha ! Recommencez.");
        });
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