var getModal = function() {
    var modalDom = PopupManager.modalDom;
    if (!modalDom) {
        modalDom = document.createElement('div');
        PopupManager.modalDom = modalDom;

        modalDom.addEventListener('touchmove', function(event) {
            event.preventDefault();
            event.stopPropagation();
        });
    }

    return modalDom;
};

var handleModalClick = function() {
    PopupManager.doOnModalClick && PopupManager.doOnModalClick();
};

var instances = {};

var PopupManager = {
    zIndex: 1000,

    getInstance: function(id) {
        return instances[id];
    },

    register: function(id, instance) {
        if (id && instance) {
            instances[id] = instance;
        }
    },

    deregister: function(id) {
        if (id) {
            instances[id] = null;
            delete instances[id];
        }
    },

    nextZIndex: function() {
        return PopupManager.zIndex++;
    },

    modalStack: [],

    doOnModalClick: function() {
        const topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
        if (!topItem) return;

        const instance = PopupManager.getInstance(topItem.id);
        if (instance && instance.closeOnClickModal) {
            instance.close();
        }
    },

    openModal: function(id, zIndex, dom, modalClass) {
        if (!id || zIndex === undefined) return;

        const modalStack = this.modalStack;

        for (var i = 0, j = modalStack.length; i < j; i++) {
            var item = modalStack[i];
            if (item.id === id) {
                return;
            }
        }

        var modalDom = getModal();
        setTimeout(function() {
            modalDom.addEventListener('click', handleModalClick);
        }, 300);

        modalDom.classList.add('v-modal');
        modalDom.classList.add('v-modal-enter');
        if (modalClass) {
            var classArr = modalClass.trim().split(/\s+/);
            classArr.forEach(function(item) {
                return modalDom.classList.add(item);
            });
        }
        setTimeout(function(){
            modalDom.classList.remove('v-modal-enter');
        }, 200);

        if (dom && dom.parentNode && dom.parentNode.nodeType !== 11) {
            dom.parentNode.appendChild(modalDom);
        } else {
            document.body.appendChild(modalDom);
        }

        if (zIndex) {
            modalDom.style.zIndex = zIndex;
        }
        modalDom.style.display = '';

        this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
    },

    closeModal: function(id) {
        const modalStack = this.modalStack;
        const modalDom = getModal();

        if (modalStack.length > 0) {
            const topItem = modalStack[modalStack.length - 1];
            if (topItem.id === id) {
                if (topItem.modalClass) {
                    var classArr = topItem.modalClass.trim().split(/\s+/);
                    classArr.forEach(function(item) {
                        return modalDom.classList.remove(item);
                    });
                }

                modalStack.pop();
                if (modalStack.length > 0) {
                    modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
                }
            } else {
                for (var i = modalStack.length - 1; i >= 0; i--) {
                    if (modalStack[i].id === id) {
                        modalStack.splice(i, 1);
                        break;
                    }
                }
            }
        }

        if (modalStack.length === 0) {
            modalDom.classList.add('v-modal-leave');
            setTimeout(function()  {
                if (modalStack.length === 0) {
                    if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);
                    modalDom.style.display = 'none';
                }
                modalDom.removeEventListener('click', handleModalClick);
                modalDom.classList.remove('v-modal-leave');
            }, 200);
        }
    }
};
window.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) { // ESC
        if (PopupManager.modalStack.length > 0) {
            var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
            if (!topItem) return;
            var instance = PopupManager.getInstance(topItem.id);
            if (instance.closeOnPressEscape) {
                instance.close();
            }
        }
    }
});

module.exports = PopupManager;