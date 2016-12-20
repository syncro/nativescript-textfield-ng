var common = require("./textfield-ng-common");
var enums = require("ui/enums");
var utils = require("utils/utils");
var types = require("utils/types");
var dismissKeyboardTimeoutId;

var editableTextBase = require("ui/editable-text-base");

require("utils/module-merge").merge(common, module.exports);

var TextFieldNg = (function (_super) {
    global.__extends(TextFieldNg, _super);
    function TextFieldNg() {
        _super.apply(this, arguments);
    }
    TextFieldNg.prototype._createUI = function () {

	    this._android = new android.widget.EditText(this._context);

    	var that = new WeakRef(this);
        this._textWatcher = new android.text.TextWatcher({
            beforeTextChanged: function (text, start, count, after) {
            },
            onTextChanged: function (text, start, before, count) {
                var owner = that.get();
                if (!owner) {
                    return;
                }
                var selectionStart = owner.android.getSelectionStart();
                owner.android.removeTextChangedListener(owner._textWatcher);
                owner.style._updateTextDecoration();
                owner.style._updateTextTransform();
                owner.android.addTextChangedListener(owner._textWatcher);
                owner.android.setSelection(selectionStart);
            },
            afterTextChanged: function (editable) {
                var owner = that.get();
                if (!owner) {
                    return;
                }
                switch (owner.updateTextTrigger) {
                    case enums.UpdateTextTrigger.focusLost:
                        owner._dirtyTextAccumulator = editable.toString();
                        break;
                    case enums.UpdateTextTrigger.textChanged:
                        owner._onPropertyChangedFromNative(editableTextBase.EditableTextBase.textProperty, editable.toString());
                        break;
                    default:
                        throw new Error("Invalid updateTextTrigger: " + owner.updateTextTrigger);
                }
            }
        });
        this._android.addTextChangedListener(this._textWatcher);
        var focusChangeListener = new android.view.View.OnFocusChangeListener({
            onFocusChange: function (view, hasFocus) {

                var owner = that.get();
                if (!owner) {
                    return;
                }
                if (hasFocus) {
                    if (dismissKeyboardTimeoutId) {
                        clearTimeout(dismissKeyboardTimeoutId);
                        dismissKeyboardTimeoutId = undefined;
                    }
                    owner._emit('focus');
                }
                else {
                    if (owner._dirtyTextAccumulator) {
                        owner._onPropertyChangedFromNative(editableTextBase.EditableTextBase.textProperty, owner._dirtyTextAccumulator);
                        owner._dirtyTextAccumulator = undefined;
                    }
                    dismissKeyboardTimeoutId = setTimeout(function () {
                        owner.dismissSoftInput();
                        dismissKeyboardTimeoutId = null;
                    }, 1);
                }
            }
        });
        this._android.setOnFocusChangeListener(focusChangeListener);
	
    };
    return TextFieldNg;
})(common.TextFieldNg);

exports.TextFieldNg = TextFieldNg;
