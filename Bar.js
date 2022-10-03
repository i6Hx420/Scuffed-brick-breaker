export class Bar {
    constructor(game){
        this.width = 100;
        this.height = 10;
        this.game = game;
        this.x = (this.game.width * 0.5) - (this.width * 0.5);
        this.y = (this.game.height * 0.95) - (this.height * 0.5);
    }
    update(){
        this.x = this.game.mouse.x - (this.width * 0.5);
    }
    draw(context){
        context.save();
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.fillStyle = "black";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
    }
}