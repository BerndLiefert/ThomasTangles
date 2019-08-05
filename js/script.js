/** 
 *  JavaScript imlementation of Thomas's Tangles, see also: https://scratch.mit.edu/projects/135816631
 *  https://computingnorthampton.blogspot.com/2016/06/unplugged-activity-thomas-tangles.html
 *  Hello World 9th Edition Page 74-74 download: https://helloworld.raspberrypi.org/issues/9
 *  
 **/

const CANVAS = document.createElement("canvas");
const CONTEXT = CANVAS.getContext("2d");

CANVAS.width = 600;
CANVAS.height = 600;
CANVAS.id = "stage";
// CANVAS.style.setProperty("border", "1px solid black");

document.getElementsByTagName("main")[0].appendChild(CANVAS);

const CENTER = {
    x : CANVAS.width / 2,
    y : CANVAS.height / 2
};

class ThomasTangles {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.blocks = [];
        this.init();
    }

    init() {
        this.canvas.style.setProperty("background", "#fff");
        this.player = {x: CENTER.x, y: CENTER.y, color: "#000"};
        this.number = this.dice();
        this.game();
    }

    dice() {
        return this.random(1, 6);
    }

    random(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    game() {
        this.update();
        // repeat algorithm until the game stops
        requestAnimationFrame(this.game.bind(this));
    }

    update() {
        if (this.number == 1) {
            let moves = this.dice();
            if (!this.checkForBlocks(this.player.x, this.player.y - moves)) {
                for (let i = 0; i < moves; i++) {
                    this.player.y--;
                    this.draw(this.player.x, this.player.y, this.player.color);
                    this.addBlock(this.player.x, this.player.y, this.player.color);
                }
            } else {
                this.player.x = this.random(0, this.canvas.width);
                this.player.y = this.random(0, this.canvas.height);
            }
        } else if (this.number == 2) {
            let moves = this.dice();
            if (!this.checkForBlocks(this.player.x, this.player.y + moves)) {
                for (let i = 0; i < moves; i++) {
                    this.player.y++;
                    this.draw(this.player.x, this.player.y, this.player.color);
                    this.addBlock(this.player.x, this.player.y, this.player.color);
                }
            } else {
                this.player.x = this.random(0, this.canvas.width);
                this.player.y = this.random(0, this.canvas.height);
            }
        } else if (this.number == 3) {
            let moves = this.dice();
            if (!this.checkForBlocks(this.player.x - moves, this.player.y)) {
                for (let i = 0; i < moves; i++) {
                    this.player.x--;
                    this.draw(this.player.x, this.player.y, this.player.color);
                    this.addBlock(this.player.x, this.player.y, this.player.color);
                }
            } else {
                this.player.x = this.random(0, this.canvas.width);
                this.player.y = this.random(0, this.canvas.height);
            }
        } else if (this.number == 4) {
            let moves = this.dice();
            if (!this.checkForBlocks(this.player.x + moves, this.player.y)) {
                for (let i = 0; i < moves; i++) {
                    this.player.x++;
                    this.draw(this.player.x, this.player.y, this.player.color);
                    this.addBlock(this.player.x, this.player.y, this.player.color);
                }
            } else {
                this.player.x = this.random(0, this.canvas.width);
                this.player.y = this.random(0, this.canvas.height);
            }
        } else if (this.number == 5) {
            let color = this.dice();
            switch (color) {
                case 1:
                    this.player.color = "#f00";
                    break;
                case 2:
                    this.player.color = "#00f";
                    break;
                case 3:
                    this.player.color = "#000";
                    break;
                case 4:
                    this.player.color = "#f00";
                    break;
                case 5:
                    this.player.color = "#f39c12";
                    break
                case 6:
                    this.player.color = "#f4d03f";
                    break;
            }
        } else {
            this.player.x = this.random(0, this.canvas.width);
            this.player.y = this.random(0, this.canvas.height);
        }

        this.number = this.dice();
    }

    checkForBlocks(x, y) {
        for (let block of this.blocks) {
            if (block.x == x && block.y == y) {
                return true;
            }
        }
        return false;
    }

    addBlock(x, y, color) {
        this.blocks.push({
            x: x,
            y: y,
            color: color
        });
    } 

    draw(x, y, color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
        this.context.fillStyle = "#000";
    }
}

let thomas = new ThomasTangles(CANVAS, CONTEXT);


