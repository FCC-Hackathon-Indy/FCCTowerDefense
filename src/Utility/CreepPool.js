import Creep from '../GameObjects/Creep';

export default class CreepPool extends Phaser.Group {
	constructor(game, instanceCount, poolName, path) {
		super(game, game.world, poolName);
		this.game = game;
		this.path = path;
		this.max

		if(instanceCount > 0) {
			for(let c = 0; c < instanceCount; ++c){
				let sprite = Math.floor(Math.random() * 9);
				this.add(new Creep(this.game, 'bad_food', sprite, this.path, 1000));
			}
		}

		return this;
	}

	increaseCreepHP(increment) {
		this.forEachDead( (dead)=>{
			dead.increaseCreepHP(increment);
		})
	}

	spawn() {
		let creep = this.getFirstExists(false);
		if(!creep) {
			let sprite = Math.floor(Math.random() * 9);
			creep = new Creep(this.game, 'bad_food', sprite, this.path, 1000);
			this.add(creep);
		}

		creep.spawn();
	}
}