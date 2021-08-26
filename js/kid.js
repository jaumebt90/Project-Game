class Kid {
    constructor(ctx, width, height, canvasSize) {
        this.ctx = ctx;
        this.kidSize = { w: width, h: height };
        this.canvasSize = canvasSize;
        this.image = undefined;
        this.kidPosition = {
            x: this.canvasSize.w / 2,
            y: this.canvasSize.h -100,
        };
        this.moveLeft = false
        this.moveRight = false
        this.image = new Image();
        this.image.src = (`/kid.png`);
    }

    drawKid() {
        this.ctx.drawImage(
            this.image,
            this.kidPosition.x,
            this.kidPosition.y,
            this.kidSize.w,
            this.kidSize.h
        )
    }

    move() {
        this.kidPosition.x <= this.canvasSize.w - 60 && this.moveRight ? this.kidPosition.x += 4 : null
        this.kidPosition.x >= 0 && this.moveLeft ? this.kidPosition.x -= 4 : null
    }


    
}