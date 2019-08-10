class Background {
  constructor(husky) {
    this.bgClouds = new Image();
    this.bgClouds.src = './assets/images/bg_clouds.png';
    this.bgTrees1 = new Image();
    this.bgTrees1.src = './assets/images/bg_trees_1.png';
    this.bgTrees2 = new Image();
    this.bgTrees2.src = './assets/images/bg_trees_2.png';
    this.envAssets = new Image();
    this.envAssets.src = './assets/images/env_assets.png';
    this.xCloud = 0;
    this.xTree1 = 0;
    this.xTree2 = 0;
    this.xGround = 0;
    this.husky = husky;
  }

  draw(ctx) {
    ctx.drawImage(this.bgClouds, this.xCloud, 0);
    ctx.drawImage(this.bgClouds, this.xCloud - 384, 0);
    ctx.drawImage(this.bgClouds, this.xCloud + 384, 0);
    ctx.drawImage(this.bgTrees1, this.xTree1, 0);
    ctx.drawImage(this.bgTrees1, this.xTree1 + 384, 0);
    ctx.drawImage(this.bgTrees2, this.xTree2, 0);
    ctx.drawImage(this.bgTrees2, this.xTree2 + 384, 0);
    for (let i=0; i < 15; i++) {
      ctx.drawImage(this.envAssets, 150, 32, 32, 16, this.xGround + (i * 32), 140, 32, 16);
    }
    this.xCloud = (this.xCloud >= 384 || this.xCloud <= -384) ? 0 : (this.xCloud + .25 - (this.husky.speed * .25));
    this.xTree1 = this.xTree1 <= -384 ? 0 : (this.xTree1 - (this.husky.speed * .5));
    this.xTree2 = this.xTree2 <= -384 ? 0 : (this.xTree2 - (this.husky.speed * .75));
    this.xGround = this.xGround <= -100 ? 0 : (this.xGround - (this.husky.speed));
  }
}

module.exports = Background;