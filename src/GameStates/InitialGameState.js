import Creep from '../GameObjects/Creep';

export default class InitialGameState extends Phaser.State {
	create() {
		this.setUpMap();
		let path = this.getObjectsByType('waypoint');
		this.creep = new Creep(this.game, 'bad_food', 0, path);
		this.creep.spawn();
	}

	update() {}

	setUpMap() {
		this.map = this.add.tilemap('level1');
		this.map.addTilesetImage('wood_tileset');

		this.tileLayer = this.map.createLayer('tilelayer');
		this.tileLayer.resizeWorld();
	}

	getObjectsByType(type) {
		return this.map.objects['pathfinding'].filter( (element) => {
			return element.type === type;
		})
	}
}