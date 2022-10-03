const brickWidth = 50
const brickHeight = 25

export class Brick {
    constructor(game, x, y){
        this.game = game;
        this.width = brickWidth;
        this.height = brickHeight;
        this.x = x;
        this.y = y;
        this.markedForDeletion = false;
    }
    update(){
        
    }
    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export class HandleBricks {
    constructor(game){
        this.game = game;
        this.gap = 10;
        this.bricks = [];
        this.handle();
    }
    update(){
        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    }
    draw(context){
        this.bricks.forEach(brick => {
            brick.draw(context);
        });
    }
    handle(){
        const paddingX = this.game.width/2 - (brickWidth + this.gap) * levels.columns * 0.5 - (brickWidth + this.gap * 0.5);
        const paddingY = (this.game.height * 0.9) - this.game.height;
        for (let y = 1; y <= levels.rows; y++){
            for (let x = 1; x <= levels.columns; x++){
                this.bricks.push(new Brick(this.game, x * (brickWidth + this.gap) + paddingX, y * (brickHeight + this.gap) - paddingY));
            }
        }
    }
}

const levels = {
    level: 1,
    columns: 14,
    rows: 10,
    // array: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    //         1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    //         1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    //         1,1,1,1,1,1,1,1,1,1,1,1,1,1]
}