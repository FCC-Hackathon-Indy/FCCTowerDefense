export default class Bullet extends Phaser.Sprite {
	constructor(game, origin, goal, speed) {
		super(game, origin.x, origin.y, 'bullet', 0);
		this.goal = goal;
		this.speed = speed;

		game.physics.enable(this, Phaser.Physics.ARCADE);
		game.add.existing(this);
	}

	getDirection(origin, destination) {
		return Phaser.Point.normalize(Phaser.Point.subtract(destination, origin));
	}

	update() {
		if(this.goal) {
			if(Phaser.Point.distance(this.goal, this.world) > 2) {
				this.body.velocity = 
					this.getDirection(this.world, this.goal)
						.setMagnitude(this.speed);
			} else {
				this.kill();
			}
		}
	}
}