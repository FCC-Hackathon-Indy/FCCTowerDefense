import Creep from '../GameObjects/Creep';
import CreepPool from '../Utility/CreepPool';
import Tower from '../GameObjects/Tower';

export default class InitialGameState extends Phaser.State {

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

	setUpInput() {
		this.game.input.onDown.add(this.spawnTower, this);
	}

	create() {
		this.setUpMap();
		this.setUpPool();
		this.setUpInput();

		this.gfx = this.drawCursor(0, 0);
	}

	update() {
		let coords = this.getTileCoords(this.game.input.mousePointer);
		this.gfx.x = coords.x * 32;
		this.gfx.y = coords.y * 32;
	}

	spawnTower(pointer) {
		let tileCoords = this.getTileCoords(pointer);
		this.tower = new Tower(
			this.game, 
			'waterTower', 
			{
				x: tileCoords.x * 32,
				y: tileCoords.y * 32
			});
	}

	drawCursor(x, y) {
		let graphics = this.game.add.graphics(0, 0);
		graphics.beginFill(0x0000ff, .2);
		graphics.lineStyle(2, 0x0000FF, .2);
		graphics.drawRect(x, y, 32, 32);
		return graphics;
	}

	// Map Utility methods (maybe refactor out to a diff file)
	getObjectsByType(type) {
		return this.map.objects['pathfinding'].filter( (element) => {
			return element.type === type;
		})
	}

	getTileCoords(worldCoords) {
		return {
			x: Math.floor(worldCoords.x / 32),
			y: Math.floor(worldCoords.y / 32)
		}
	}
}