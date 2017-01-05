var view = require("ui/core/view");
var dObservable = require("ui/core/dependency-observable");
var proxy = require("ui/core/proxy");

var textField = require("ui/text-field");

global.moduleMerge(textField.TextField, exports);

var TextFieldNg = (function (_super) {
    global.__extends(TextFieldNg, _super);
    function TextFieldNg() {
        _super.call(this);
    }
    return TextFieldNg;
})(textField.TextField);

exports.TextFieldNg = TextFieldNg;
