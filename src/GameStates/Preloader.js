import * as Manifest from '../AssetManifest.json';
export default class Preloader extends Phaser.State {

	preload() {
		this.preloadBar = this.add.sprite(450, 640, 'preloadbar');
		this.load.setPreloadSprite(this.preloadBar);

		for (var key in Manifest) {
			if (key == 'images') {
				for (var index in Manifest[key]){
					let image = Manifest[key][index];
					require('../../assets/' + image);
					this.load.image(
						image.replace(/\.[^/.]+$/, ""), 
						'assets/' + image);
				}
			} else if (key == 'spriteSheets') {
				for (var index in Manifest[key]) {
					let spritesheet = Manifest[key][index];
					require('../../assets/' + spritesheet.imageFile)
					this.load.spritesheet(
						spritesheet.key, 
						'assets/' + spritesheet.imageFile,
						spritesheet.frameHeight,
						spritesheet.frameWidth,
						spritesheet.frameMax?spritesheet.frameMax : -1,
						spritesheet.frameMargin?spritesheet.frameMargin : 0,
						spritesheet.frameSpacing?spritesheet.frameSpacing : 0)
				}
			} else if (key == 'tileMaps') {
				for (var index in Manifest[key]) {
					let tileMap = Manifest[key][index];
					require('../../assets/' + tileMap)
					this.load.tilemap(
						tileMap.replace(/\.[^/.]+$/, ""),
						'assets/' + tileMap,
						null,
						Phaser.Tilemap.TILED_JSON
					);
				}
			}
		}

	}

	create() {
		var tween = this.add.tween(this.preloadBar).to({
			alpha: 0
		}, 1000, Phaser.Easing.Linear.None, true);
		
		tween.onComplete.add(this.startGame, this);
	}
 
	startGame() {
		this.game.state.start('InitialGameState', true, false);
	}
}