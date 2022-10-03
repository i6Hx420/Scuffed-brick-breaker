export class Ball {
    constructor(game, x, y){
        this.size = 10;
        this.game = game;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 6;
        this.markedForDeletion = false;
    }
    update(){
        this.checkBarCollision();
        this.checkBrickCollision()
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x >= this.game.width - this.size || this.x <= 0 + this.size) this.speedX *= -1;
        if (this.y <= 0 + this.size) this.speedY *= -1;
        // if (this.y >= this.game.height - this.size) this.speedY *= -1
        // if (this.y >= this.game.height - this.size) this.y = this.game.height - this.size, this.speedX = 0;
        if (this.y >= this.game.height - this.size) this.y = this.game.height - this.size, this.markedForDeletion = true;
    }
    draw(context){
        context.save();
        context.fillStyle = 'aqua';
        context.beginPath();
        // context.lineWidth = 2;
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // context.arc(this.game.bar.x + this.game.bar.width * 0.5, this.game.bar.y, this.size, 0, Math.PI * 2);
        // context.stroke();
        context.fill();
        context.restore();
    }
    checkBarCollision(){
        let pivot = this.game.bar.x + this.game.bar.width * 0.5;
        let dx = this.x - pivot ;
        if (
            this.x < this.game.bar.x + this.game.bar.width &&
            this.x + this.size > this.game.bar.x &&
            this.y < this.game.bar.y + this.game.bar.height &&
            this.y + this.size > this.game.bar.y
        ){
            this.speedY *= -1;
            this.speedX = Math.abs(this.speedY * 0.1)
            this.speedX *= (dx * 0.2)
        }
    }
    checkBrickCollision(){
        this.game.handlebricks.bricks.forEach(brick => {
            if (
                this.x < brick.x + brick.width &&
                this.x + this.size > brick.x &&
                this.y < brick.y + brick.height &&
                this.y + this.size > brick.y
            ){
                this.speedY *= -1;
                brick.markedForDeletion = true;
                this.game.score++;
            }
        });
    }
}


export class HandleBalls {
    constructor(game, amount){
        this.game = game;
        this.amount = amount;
        this.balls = [];
        this.handle();
    }
    update(){
        this.balls = this.balls.filter(ball => !ball.markedForDeletion);
        this.balls.forEach(ball => {
            ball.update();
        });
    }
    draw(context){
        this.balls.forEach(ball => {
            ball.draw(context);
        });
    }
    handle(){
        for (let i = 0; i < this.amount; i++){
            this.balls.push(new Ball(this.game, (this.game.width * 0.5) + (this.balls.length * 0.1), (this.game.height * 0.8)));
        }
    }
}