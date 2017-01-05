var common = require("./textfield-ng-common");

require("utils/module-merge").merge(common, module.exports);

var UITextFieldDelegateImpl = (function (_super) {
    __extends(UITextFieldDelegateImpl, _super);
    function UITextFieldDelegateImpl() {
        _super.apply(this, arguments);
    }
    UITextFieldDelegateImpl.initWithOwner = function (owner) {
        var delegate = UITextFieldDelegateImpl.new();
        delegate._owner = owner;
        return delegate;
    };
    UITextFieldDelegateImpl.prototype.textFieldDidBeginEditing = function (searchBar) {
        var owner = this._owner.get();
        if (!owner) {
            return;
        }
        owner._emit('focus');
    };
    UITextFieldDelegateImpl.prototype.textFieldDidEndEditing = function (searchBar) {
        var owner = this._owner.get();
        if (!owner) {
            return;
        }
        //owner._emit('focus');
    };
    UITextFieldDelegateImpl.ObjCProtocols = [UITextFieldDelegate];
    return UITextFieldDelegateImpl;
}(NSObject));

var TextFieldNg = (function (_super) {
    global.__extends(TextFieldNg, _super);
    function TextFieldNg() {
        _super.apply(this, arguments);
        this._ios = new UITextField();
        this._delegate = UITextFieldDelegateImpl.initWithOwner(new WeakRef(this));
    }
    TextFieldNg.prototype.onLoaded = function () {
        _super.prototype.onLoaded.call(this);
        this._ios.delegate = this._delegate;
    };
    TextFieldNg.prototype.onUnloaded = function () {
        this._ios.delegate = null;
        _super.prototype.onUnloaded.call(this);
    };
    Object.defineProperty(TextFieldNg.prototype, "ios", {
        get: function () {
            return this._ios;
        }
    });
    return TextFieldNg;
})(common.TextFieldNg);

exports.TextFieldNg = TextFieldNg;