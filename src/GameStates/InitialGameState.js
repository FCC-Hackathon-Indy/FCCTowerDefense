import Creep from '../GameObjects/Creep';
import CreepPool from '../Utility/CreepPool';

export default class InitialGameState extends Phaser.State {
	create() {
		this.setUpMap();
		this.setUpPool();
	}

	update() {}

	setUpMap() {
		this.map = this.add.tilemap('level1');
		this.map.addTilesetImage('wood_tileset');

		this.map.layers.map( (layer) => {
			this.map.createLayer(layer.name).resizeWorld();
		})
	}

	setUpPool() {
		let path = this.getObjectsByType('waypoint');

		this.pool = new CreepPool(this.game, 5, 'creepPool', path);
		this.time.events.repeat(Phaser.Timer.SECOND * 2, Infinity, ()=>{
			this.pool.spawn();
		})
	}

	getObjectsByType(type) {
		return this.map.objects['pathfinding'].filter( (element) => {
			return element.type === type;
		})
	}
}