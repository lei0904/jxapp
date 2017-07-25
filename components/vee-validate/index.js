module.exports = {
    init: function () {

        var Vue = require('vue');
        var zh_CN = require('./locale/zh_CN.js');
        var VeeValidate = require('./vee-validate.js');
        var Validator = VeeValidate.Validator;
        Validator.updateDictionary({
            zh_CN: {
                messages: zh_CN.messages
            }
        });
        Validator.extend('mobile', {
            messages: {
                zh_CN: function (field) {
                    return field + ' 格式错误';
                }
            },
            validate: function (value) {
                return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
            }
        });

        Vue.use(VeeValidate, {
            errorBagName: 'errors', // change if property conflicts.
            fieldsBagName: 'fields',
            delay: 0,
            locale: 'zh_CN',
            dictionary: null,
            strict: true,
            enableAutoClasses: false,
            classNames: {
                touched: 'touched', // the control has been blurred
                untouched: 'untouched', // the control hasn't been blurred
                valid: 'valid', // model is valid
                invalid: 'invalid', // model is invalid
                pristine: 'pristine', // control has not been interacted with
                dirty: 'dirty' // control has been interacted with
            },
            events: 'input|blur',
            inject: true
        });

    }
};