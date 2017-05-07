export default class Tower extends Phaser.Sprite {
	constructor(game, key, origin) {
		super(game, origin.x, origin.y, key, 0);
		this.anchor.setTo(0, 0);

		this.game.add.existing(this);
	}
}