/**
 * Contains the class, which represents a textfield widget.
 */
declare module "textfield-ng" {
    import observable = require("data/observable");
    import dependencyObservable = require("ui/core/dependency-observable");
    import textField = require("ui/text-field");
    /**
     * Represents a standard Button widget.
     */
    export class TextFieldNg extends textField.TextField {

        /**
         * String value used when hooking to focus event.
         */
        public static focusEvent: string;

        android: any;

        ios: any;

    }
}