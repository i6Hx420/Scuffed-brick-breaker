import { Bar } from "./Bar.js";
import { HandleBalls } from "./Ball.js";
import { HandleBricks } from "./brick.js";
import { UI } from "./UI.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1400;
canvas.height = 720;
let canvasBox = canvas.getBoundingClientRect();

// levels arrays
// slowly follow the mouse
// change color on next level
// particles when explosion
// score
// powerups states
//  flame ball, extra balls, guns, slowmotion, make platform bigger
// UI
//  powerups time indications, score, level
// start screen and pause

class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.init();
        this.getMousePos();
        this.score = 0;
        this.fontColor = 'black';
    }
    init(){
        this.UI = new UI(this);
        this.bar = new Bar(this);
        this.handleballs = new HandleBalls(this, 1);
        this.handlebricks = new HandleBricks(this);
    }
    update(){
        this.bar.update();
        this.handleballs.update();
        this.handlebricks.update();
    }
    draw(context){
        this.UI.draw(context);
        this.bar.draw(context);
        this.handleballs.draw(context);
        this.handlebricks.draw(context);
    }
    getMousePos(){
        // mouse stuff
        this.mouse = {
            x: (this.width * 0.5),
            y: (this.height * 0.95)
        }
        window.addEventListener('mousemove', event => {
            let scaleX = canvas.width / canvasBox.width;
            let scaleY = canvas.height / canvasBox.height;

            this.mouse.x = (event.clientX - canvasBox.left) * scaleX;
            this.mouse.y = (event.clientY - canvasBox.top) * scaleY;
        });
        // touch support

    }
}

const game = new Game(canvas.width, canvas.height);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(225,255,255,0.2)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    game.draw(ctx);
    game.update();
    // ctx.fillRect(0, canvas.height * 0.5, canvas.width, 1)
    // ctx.fillRect(canvas.width * 0.5, 0, 1, canvas.height)

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {canvasBox = canvas.getBoundingClientRect()});