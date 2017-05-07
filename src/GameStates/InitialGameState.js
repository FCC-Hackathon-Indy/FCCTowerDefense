import CreepPool from '../Utility/CreepPool';
import TowerPool from '../Utility/TowerPool';

export default class InitialGameState extends Phaser.State {

	setUpMap() {
		this.map = this.add.tilemap('level1');
		this.map.addTilesetImage('wood_tileset');

		this.map.layers.map( (layer) => {
			this.map.createLayer(layer.name).resizeWorld();
		})
	}

	setUpPool() {
		let path = this.getObjectsByType('waypoint');

		this.creepPool = new CreepPool(this.game, 5, 'creepPool', path);
		this.time.events.repeat(Phaser.Timer.SECOND * 2, Infinity, ()=>{
			this.creepPool.spawn();
		})

		this.time.events.repeat(Phaser.Timer.SECOND, Infinity, ()=>{
			this.creepPool.increaseCreepHP(100);
		})

		let disallowedTiles = [4, 20, 36, 5, 35, 19, 21, 23, 8, 40, 38, 6, 7, 24, 39, 22];
		this.towerPool = new TowerPool(this.game, 'towerPool', this.map.layers[0].data, disallowedTiles);
	}

	setUpInput() {
		this.game.input.onDown.add(this.spawnTower, this);
	}

	create() {
		this.setUpMap();
		this.setUpPool();
		this.setUpInput();

		this.gfx = this.drawCursor(0, 0);
		
		this.score = 0;
    	this.scoreBuffer = 0;
		
		this.createScore();
	}

	update() {
		let coords = this.getTileCoords(this.game.input.mousePointer);
		this.gfx.x = coords.x * 32;
		this.gfx.y = coords.y * 32;

		this.towerPool.update(this.creepPool);
		
		if(this.scoreBuffer > 0){
        	this.incrementScore();
        	this.scoreBuffer--;
		};
	}

	spawnTower(pointer) {
		let tileCoords = this.getTileCoords(pointer);
		this.towerPool.spawn(tileCoords.x * 32, tileCoords.y * 32);
	}

	drawCursor(x, y) {
		let graphics = this.game.add.graphics(0, 0);
		graphics.beginFill(0x0000ff, .2);
		graphics.lineStyle(2, 0x0000FF, .2);
		graphics.drawRect(x, y, 32, 32);
		return graphics;
	}

	// Map Utility methods (maybe refactor out to a diff file)
	getObjectsByType(type) {
		return this.map.objects['pathfinding'].filter( (element) => {
			return element.type === type;
		})
	}

	getTileCoords(worldCoords) {
		return {
			x: Math.floor(worldCoords.x / 32),
			y: Math.floor(worldCoords.y / 32)
		}
	}
	
	createScore() {
		var scoreFont = "120px Arial";
		
		this.scoreLabel = this.game.add.text(this.game.world.centerX, 50, "0", {font: scoreFont, fill: "#9332d3", stroke: "#fff", strokeThickness: 15});
		
		this.scoreLabel.anchor.setTo(.5, 0);
		this.scoreLabel.align = 'center';
		
		this.scoreLabelTween = this.add.tween(this.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
	}
	
	incrementScore() {
		this.score += 1;
		this.scoreLabel.text = this.score;
	}
	
	scoreAnimation() {
		var scoreFont = "80px Arial";
		
		var scoreAnimation = this.game.add.text(x, y, message, {font: scoreFont, fill: "#fff600", stroke: "#000", strokeThickness: 15});
		scoreAnimation.anchor.setTo(.5, 0);
		scoreAnimation.align = 'center';
		
		var scoreTween = this.game.add.tween(scoreAnimation).to({x:this.game.world.centerX, y: 50}, 800, Phaser.Easing.Exponential.In, true);
		
		scoreTween.onComplete.add(function(){
        	scoreAnimation.destroy();
        	this.scoreLabelTween.start();
        	this.scoreBuffer += score;
    	}, this);
	}
}