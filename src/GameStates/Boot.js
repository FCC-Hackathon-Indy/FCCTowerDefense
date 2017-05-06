import '../../assets/loader.png';
export default class Boot extends Phaser.State {
	preload() {
		this.load.image('preloadbar', 'assets/loader.png');
	}

	create() {
		this.input.maxPointers = 1;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start('Preloader', true, false);
	}
}