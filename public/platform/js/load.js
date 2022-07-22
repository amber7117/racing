var _load;
var Load = (function (_super) {
    function Load() {
        _load = this;
        Load.super(this);
        this.reset();
    }
    Laya.class(Load, "Load", _super)
    var _proto = Load.prototype;

    _proto.reset = function () {
        this.car.pos(712,571)
    }

    _proto.init = function (value) {
        console.log(value);
        this.car.pos(712-932*value,571+299*value)
    }

    return Load;

})(ui.loadUI);