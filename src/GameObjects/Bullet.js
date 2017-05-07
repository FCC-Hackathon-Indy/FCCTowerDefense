export default class Bullet extends Phaser.Sprite {
	constructor(game, origin, goal, speed, creep) {
		super(game, origin.x, origin.y, 'bullet', 0);
		this.game
		this.goal = goal;
		this.speed = speed;
		this.creep = creep;

		game.physics.enable(this, Phaser.Physics.ARCADE);
		game.add.existing(this);
	}

	getDirection(origin, destination) {
		return Phaser.Point.normalize(Phaser.Point.subtract(destination, origin));
	}

	collision(creep) {
		this.game.physics.arcade.overlap(this, creep, this.handleCollision)
	}

	handleCollision(bullet, creep) {
		bullet.kill();
		creep.damage();
	}

	update() {
		this.collision(this.creep);
		if(this.goal) {
			if(Phaser.Point.distance(this.goal, this.world) > 0.1) {
				this.body.velocity = 
					this.getDirection(this.world, this.goal)
						.setMagnitude(this.speed);
			} else {
				this.kill();
			}
		}
	}
}