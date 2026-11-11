class BootScene extends Phaser.Scene {
  constructor() { super('BootScene'); }
  create() { Progress.load(); makeCharTextures(this); this.scene.start('MenuScene'); }
}
