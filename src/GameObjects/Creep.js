export default class Creep extends Phaser.Sprite {

	constructor(game, key, frame, path, health) {
		super(game, path[0].x, path[0].y, key, frame);
		this.game = game;
		this.path = path;
		this.goal = path[1]
		this.waypointIndex = 1;
		this.hp = health;

		this.anchor.setTo(0,1);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
		this.game.add.existing(this);
		this.derender();
	}

	addAnimation(key, frameArray) {
		this.animations.add(key, frameArray)
	}

	derender() {
		this.kill();
	}

	setGoal(point) {
		this.goal = point;
	}

	getNextWaypoint() {
		return this.path[++this.waypointIndex];
	}

	damage() {
		this.hp -= 200
		if(this.hp <= 0) {
			this.derender();
		}
	}

	spawn() {
		this.waypointIndex = 0;
		this.health = 100;
		this.reset(this.path[0].x, this.path[0].y);
		this.setGoal(this.getNextWaypoint())

	}

	getDirection(origin, destination) {
		return Phaser.Point.normalize(Phaser.Point.subtract(destination, origin));
	}

	update() {
		if(this.goal) {
			if(Phaser.Point.distance(this.goal, this.world) < 5) {
				if(this.path[this.path.length - 1] === this.goal) 
					this.derender();
				else 
					this.setGoal(this.getNextWaypoint())
			} else {
				this.body.velocity = 
					this.getDirection(this.world, this.goal)
					.setMagnitude(150);
			}
		}
	}
}