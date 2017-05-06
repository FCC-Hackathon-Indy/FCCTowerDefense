## Getting Started: 

After cloning the repository navigate to the directory and run the following commands
```
npm install
npm run start
```

### Adding assets:

When you want to add assets (i.e.: Images, SpriteSheets, TileMaps) Add your file to the assets folder. Then go into src/AssetManifest.json and add the filename to the appropriate list. 

For instance, if you want to add any sort of image (for example: grass.png) first save the grass.png to the assets folder, then go to src/AssetManifest.json and add "grass.png" to the images list:

So heres what the manifest file looks like before adding the grass.png
```
{
	"images": [
		"loader.png",
		"phaser-logo.jpg"
	],
	"spriteSheets": [],
	"tileMaps": []
}
```

now after adding grass.png

```
{
	"images": [
		"loader.png",
		"phaser-logo.jpg",
		"grass.png"
	],
	"spriteSheets": [],
	"tileMaps": []
}
```

same goes for tileMaps, you just add the tilemap.json file to the assets folder and update the "tileMaps" entry with the map. However spritesheets are a bit different. 

### SpriteSheets

SpriteSheets are typically an image containing 'frames' of a sprite and its various animations, so in order to import it to the game properly the game needs to know a few things about the Sprite Sheet

Phaser needs to know: 

- key: This is what the game references the sprite with basically its calling card

- imageFile: the name of the actual sprite sheet (i.e. spriteSheet.png)

- frameHeight: How tall each Frame is in pixels

- frameWidth: How wide each Frame is in pixels

#### SpriteSheet Manifest Example
```
{
	"images": [],
	"spriteSheets": [
		{
			"key": "creep",
			"imageFile": "creep.png",
			"frameHeight": 31,
			"frameWidth": 31
		}
	],
	"tileMaps": []
}
```
