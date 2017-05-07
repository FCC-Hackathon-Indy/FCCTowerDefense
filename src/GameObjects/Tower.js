import Bullet from './Bullet';

export default class Tower extends Phaser.Sprite {
	constructor(game, key, origin) {
		super(game, origin.x, origin.y, key, 0);
		this.closestCreep = null;
		this.origin = origin;

		this.game.add.existing(this);

		this.game.time.events.repeat(Phaser.Timer.SECOND, Infinity, this.shootAtCreep.bind(this))
	}

	shootAtCreep() {
		if(this.closestCreep){
			let velocity = this.closestCreep.body.velocity;
			let nextPosition = Phaser.Point.add(velocity, this.closestCreep.world);
			nextPosition.y -= 32;
			let speed = Phaser.Point.distance(this.world, nextPosition);

			new Bullet(this.game, this.world, nextPosition, speed);
		}
	}
	update(creepGroup) {
		if(creepGroup){
			this.closestCreep = undefined;
			let recordDistance = Infinity;
			creepGroup.forEachAlive((creep) => {
				let distance = Phaser.Point.distance(creep, this.world);
				if(!this.closestCreep) {
					this.closestCreep = creep;
					recordDistance = distance;
				} else {
					if(distance < recordDistance){
						recordDistance = distance;
						this.closestCreep = creep;
					}
				}
			}, this);
		}
	}
}