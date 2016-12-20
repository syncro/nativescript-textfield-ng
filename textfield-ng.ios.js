var common = require("./textfield-ng-common");

require("utils/module-merge").merge(common, module.exports);

var TextFieldNg = (function (_super) {
    global.__extends(TextFieldNg, _super);
    function TextFieldNg() {
        _super.apply(this, arguments);
        this._ios = new UITextField();
    }

    Object.defineProperty(TextFieldNg.prototype, "ios", {
        get: function () {
            return this._ios;
        }
    });
    return TextFieldNg;
})(common.TextFieldNg);

exports.TextFieldNg = TextFieldNg;
