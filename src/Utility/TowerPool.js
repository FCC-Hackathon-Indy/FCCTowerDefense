import Tower from '../GameObjects/Tower';

export default class TowerPool extends Phaser.Group {
	constructor(game, poolName, mapData, disallowedTiles) {
		super(game, game.world, poolName);
		this.game = game;
		this.mapData = mapData;
		this.disallowedTiles = disallowedTiles;
		return this;
	}

	spawn(x, y) {
		let isEmpty = this.isSpotEmpty(x, y);
		let canPlace = this.isAllowed(x, y);
		if(canPlace && isEmpty)
			this.add(new Tower(this.game, 'waterTower', new Phaser.Point(x, y)))
	}

	isSpotEmpty(x, y) {
		return this.children.filter( (tower) => {
			return tower.x===x && tower.y===y;
		}).length === 0;
	}

	isAllowed(x, y) {
		let tileX = (x / 32);
		let tileY = (y / 32);
		return this.disallowedTiles.indexOf(this.mapData[tileY][tileX].index) === -1;
	}

	update(creeps) {
		this.forEachAlive( (tower) => {
			tower.update(creeps);
		})
	}
}