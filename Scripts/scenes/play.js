var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // constructors
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // private methods
        Play.prototype._buildClouds = function () {
            for (var count = 0; count < this._cloudNum; count++) {
                this._clouds.push(new objects.Meteroid());
                //this._clouds[count] = new objects.Meteroid();
            }
        };
        // public methods
        Play.prototype.Start = function () {
            this.engineSound = createjs.Sound.play("engine");
            this.engineSound.loop = -1;
            this.engineSound.volume = 0.1;
            this._plane = new objects.Plane();
            this._ocean = new objects.Universe();
            this._island = new objects.Starmini();
            // creates an empty array of type Meteroid
            this._clouds = new Array();
            this._cloudNum = 3;
            this._buildClouds();
            this.Main();
        };
        Play.prototype.Update = function () {
            var _this = this;
            this._plane.Update();
            this._ocean.Update();
            this._island.Update();
            managers.Collision.check(this._plane, this._island);
            this._clouds.forEach(function (meteroid) {
                meteroid.Update();
                managers.Collision.check(_this._plane, meteroid);
            });
        };
        Play.prototype.Reset = function () { };
        Play.prototype.Destroy = function () {
            this.engineSound.stop();
            this.removeAllChildren();
        };
        Play.prototype.Main = function () {
            console.log("Starting - PLAY SCENE");
            // adding the universe to the scene
            this.addChild(this._ocean);
            // adding the starmini to the scene
            this.addChild(this._island);
            // adding the plane to the scene
            this.addChild(this._plane);
            // adding the meteroid to the scene
            for (var _i = 0, _a = this._clouds; _i < _a.length; _i++) {
                var meteroid = _a[_i];
                this.addChild(meteroid);
            }
            this.addChild(managers.Game.ScoreBoard.LivesLabel);
            this.addChild(managers.Game.ScoreBoard.ScoreLabel);
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map