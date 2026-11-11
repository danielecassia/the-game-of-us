const VIEW_W = 320, VIEW_H = 224; // área visível; mapas maiores rolam com a câmera
new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: VIEW_W, height: VIEW_H,
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#1b1530',
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [BootScene, MenuScene, StoryScene, Phase1Scene, Phase2Scene, Phase3Scene, Phase4Scene, EndingScene]
});
