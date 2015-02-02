/*
**
	** SpriteAnim v0.1.0
	** catalinberta (at) gmail (dot) com
	** https://github.com/catalinberta/SpriteAnim
	** Create easy sprite animations using EaselJS
	**
	** This is merely a code snippet that has a basic setup for sprite
	** animations. It runs with EaselJS v0.8.0+
	** I mainly created this because I had a hard time going through
	** EaselJS' documentation and it took some trial and error to find
	** the right setup.
	**
	** If you have a DOM app and want to create some fast spritesheets
	** in WebGL, which fall back to Canvas, then this might be of help.
	** EaselJS has everything covered for you, including use of
	** requestAnimationFrame.
**
*/

function SpriteAnim(canvasId) {
	this.init(canvasId);
}

SpriteAnim.prototype.init = function(canvasId) {
	this.canvasId = canvasId;
}

SpriteAnim.prototype.start = function(imageData,animationName,className) {
	createjs.Ticker.off("tick", this.animTicker); // Stop any previous Tickers for this instance
	this.canvasWidth = imageData.frames.width;
	this.canvasHeight = imageData.frames.height;
	this.stage = new createjs.SpriteStage(this.canvasId);
	this.stage.canvas.width = this.canvasWidth;
	this.stage.canvas.height = this.canvasHeight;
	this.stage.updateViewport(this.canvasWidth,this.canvasHeight);
	this.imageData = imageData;
	this.spritesheet = new createjs.SpriteSheet(this.imageData);
	this.animation = new createjs.Sprite(this.spritesheet);
	this.container = this.animation;
	this.stage.addChild(this.container);
	this.animationName = animationName;
	this.animation.gotoAndPlay(this.animationName);
	this.animTicker = createjs.Ticker.on("tick", this.stage);
	this.className = className;

	if(this.className) {
		this.stage.canvas.className = this.stage.canvas.className + ' ' + this.className;
	}

}

SpriteAnim.prototype.stop = function() {
	createjs.Ticker.off("tick", this.animTicker);
}