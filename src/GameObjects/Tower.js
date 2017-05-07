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
		/*
			since velocity of a creep is in pixels per second and our 
			bullet will always reach its destination in one second 
			(variable velocity) then we can check if the object will 
			reach the waypoint by seeing if the velocity of the creep 
			is less than the distance to the waypoint

			(this is just the first part of the actual solution)
		*/

		if(this.closestCreep) {
			if(Phaser.Point.distance(this.closestCreep.world, this.closestCreep.goal) >= this.closestCreep.body.velocity.getMagnitude()) {
				let target = Phaser.Point.add(this.closestCreep.body.velocity, this.closestCreep.world);
				target.y -= 62;
				let speed = Phaser.Point.distance(this.world, target);

				new Bullet(this.game, this.world, target, speed, this.closestCreep);
			}
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