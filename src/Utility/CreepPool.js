import Creep from '../GameObjects/Creep';

export default class CreepPool extends Phaser.Group {
	constructor(game, instanceCount, poolName, path) {
		super(game, game.world, poolName);
		this.game = game;
		this.path = path;

		if(instanceCount > 0) {
			for(let c = 0; c < instanceCount; ++c){
				let sprite = Math.floor(Math.random() * 9);
				this.add(new Creep(this.game, 'bad_food', sprite, this.path));
			}
		}

		return this;
	}

	spawn() {
		let creep = this.getFirstExists(false);
		if(!creep) {
			let sprite = Math.floor(Math.random() * 9);
			creep = new Creep(this.game, 'bad_food', sprite, this.path);
			this.add(creep);
		}

		creep.spawn();
	}
}