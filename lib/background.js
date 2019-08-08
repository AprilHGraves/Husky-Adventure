class Background {
  constructor(width, height) {
    this.background1 = new Image();
    this.background1.src = "./assets/images/Nuvens.png";
    this.background2 = new Image();
    this.background2.src = "./assets/images/Backgroud2.png";
    this.background3 = new Image();
    this.background3.src = "./assets/images/Backgroud3.png";
    this.spriteSheet = new Image();
    this.spriteSheet.src = "./assets/images/Assets.png";
    this.x1 = 0;
    this.x2 = 0;
    this.x3 = 0;
    this.x4 = 0;
    this.speed = 0;
    // this.foreground = new Image();
  }

  draw(ctx) {
    ctx.drawImage(this.background1, this.x1, 0);
    ctx.drawImage(this.background1, this.x1 - 384, 0);
    ctx.drawImage(this.background1, this.x1 + 384, 0);
    ctx.drawImage(this.background2, this.x2, 0);
    ctx.drawImage(this.background2, this.x2 + 384, 0);
    ctx.drawImage(this.background3, this.x3, 0);
    ctx.drawImage(this.background3, this.x3 + 384, 0);
    for (let i=0; i < 15; i++) {
      ctx.drawImage(this.spriteSheet, 150, 32, 32, 16, this.x4 + (i * 32), 140, 32, 16);
    }
    this.x1 = (this.x1 >= 384 || this.x1 <= -384) ? 0 : (this.x1 + .25 - (this.speed * .25));
    this.x2 = this.x2 <= -384 ? 0 : (this.x2 - (this.speed * .5));
    this.x3 = this.x3 <= -384 ? 0 : (this.x3 - (this.speed * .75));
    this.x4 = this.x4 <= -100 ? 0 : (this.x4 - (this.speed));
  }
}

module.exports = Background;