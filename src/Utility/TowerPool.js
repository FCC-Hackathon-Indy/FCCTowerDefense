import Tower from '../GameObjects/Tower';

export default class TowerPool extends Phaser.Group {
	constructor(game, poolName) {
		super(game, game.world, poolName);
		this.game = game;
		return this;
	}

	spawn(x, y) {
		this.add(new Tower(this.game, 'waterTower', new Phaser.Point(x, y)))
	}

	update(creeps) {
		this.forEachAlive( (tower) => {
			tower.update(creeps);
		})
	}
}