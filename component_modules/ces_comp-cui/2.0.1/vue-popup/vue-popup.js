var Vue = require('vue');
var merge = require('./util.js');
var PopupManager = require('./popup-manager.js');

var bus = require('../vue-event-bus/vue-event-bus.js');

var idSeed = 1;
var transitions = [];

var hookTransition = function(transition) {
    if (transitions.indexOf(transition) !== -1) return;

    var getVueInstance = function(element) {
        var instance = element.__vue__;
        if (!instance) {
            var textNode = element.previousSibling;
            if (textNode.__vue__) {
                instance = textNode.__vue__;
            }
        }
        return instance;
    };

    Vue.transition(transition, {
        afterEnter: function(el) {
            var instance = getVueInstance(el);

            if (instance) {
                instance.doAfterOpen && instance.doAfterOpen();
            }
        },
        afterLeave: function(el) {
            const instance = getVueInstance(el);

            if (instance) {
                instance.doAfterClose && instance.doAfterClose();
            }
        }
    });
};

var getDOM = function(dom) {
    if (dom.nodeType === 3) {
        dom = dom.nextElementSibling || dom.nextSibling;
        getDOM(dom);
    }
    return dom;
};

module.exports = {
    props: {
        /*visible: {
            type: Boolean,
            twoWay: true,
            default: false
        },*/
        transition: {
            type: String,
            default: ''
        },
        openDelay: {},
        closeDelay: {},
        zIndex: {},
        modal: {
            type: Boolean,
            default: false
        },
        lockScroll: {
            type: Boolean,
            default: true
        },
        modalClass: {
        },
        closeOnPressEscape: {
            type: Boolean,
            default: false
        },
        closeOnClickModal: {
            type: Boolean,
            default: false
        }
    },

    created: function() {
        if (this.transition) {
            hookTransition(this.transition);
        }
    },

    mounted: function() {
        this._popupId = 'popup-' + idSeed++;
        PopupManager.register(this._popupId, this);
    },

    beforeDestroy: function() {
        PopupManager.deregister(this._popupId);
        PopupManager.closeModal(this._popupId);
    },

    data: function() {
        return {
            bodyOverflow: null,
            rendered: false,
            visible: false
        };
    },

    watch: {
        visible: function(val) {
            if (val) {
                if (this._opening) return;
                if (!this.rendered) {
                    this.rendered = true;
                    var _this = this;
                    Vue.nextTick(function(){
                        _this.open();
                    });
                } else {
                    this.open();
                }
            } else {
                this.close();
            }
        }
    },

    methods: {
        open: function(options) {
            if (!this.rendered) {
                this.rendered = true;
                this.visible = true;

                return;
            }

            var props = merge({}, this, options);

            if (this._closeTimer) {
                clearTimeout(this._closeTimer);
                this._closeTimer = null;
            }
            clearTimeout(this._openTimer);

            var openDelay = Number(props.openDelay);
            if (openDelay > 0) {
                var _this = this;
                this._openTimer = setTimeout(function() {
                    _this._openTimer = null;
                    _this.doOpen(props);
                }, openDelay);
            } else {
                this.doOpen(props);
            }
        },

        doOpen: function(props) {
            if (this.willOpen && !this.willOpen()) return;

            this._opening = true;
            this.visible = true;

            var dom = getDOM(this.$el);

            var modal = props.modal;

            var zIndex = props.zIndex;
            if (zIndex) {
                PopupManager.zIndex = zIndex;
            }

            if (modal) {
                if (this._closing) {
                    PopupManager.closeModal(this._popupId);
                    this._closing = false;
                }
                PopupManager.openModal(this._popupId, PopupManager.nextZIndex(), dom, props.modalClass);
                if (props.lockScroll) {
                    if (!this.bodyOverflow) {
                        this.bodyOverflow = document.body.style.overflow;
                    }
                    document.body.style.overflow = 'hidden';
                }
            }

            if (getComputedStyle(dom).position === 'static') {
                dom.style.position = 'absolute';
            }

            if (modal) {
                dom.style.zIndex = PopupManager.nextZIndex();
            } else if (zIndex) {
                dom.style.zIndex = zIndex;
            }

            this.onOpen && this.onOpen();

            if (!this.transition) {
                this.doAfterOpen();
            }
        },

        doAfterOpen: function() {
            this._opening = false;
        },

        close: function() {
            if (this.willClose && !this.willClose()) return;

            if (this._openTimer !== null) {
                clearTimeout(this._openTimer);
                this._openTimer = null;
            }
            clearTimeout(this._closeTimer);

            var closeDelay = Number(this.closeDelay);

            if (closeDelay > 0) {
                var _this = this;
                this._closeTimer = setTimeout(function() {
                    _this._closeTimer = null;
                    _this.doClose();
                }, closeDelay);
            } else {
                this.doClose();
            }
        },

        doClose: function() {
            this.visible = false;
            this._closing = true;
            this.onClose && this.onClose();

            this.$emit('doClose');

            if (this.lockScroll) {
                if (this.modal && this.bodyOverflow !== 'hidden') {
                    document.body.style.overflow = this.bodyOverflow;
                }
            }

            if (!this.transition) {
                this.doAfterClose();
            }

        },

        doAfterClose: function() {
            PopupManager.closeModal(this._popupId);
            this._closing = false;
            bus.$emit('doClose');
        }
    }
};