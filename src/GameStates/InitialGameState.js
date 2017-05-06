export default class InitialGameState extends Phaser.State {
	create() {
		this.setUpMap();
	}
	update() {}

	setUpMap() {
		this.map = this.add.tilemap('level1');
		this.map.addTilesetImage('wood_tileset');

		this.tileLayer = this.map.createLayer('tilelayer');
		this.tileLayer.resizeWorld();
	}
}