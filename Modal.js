module.exports = (function() {

    function Modal() {
        this.set = false;

        this.modals = {};
    }

    function _toCamelCase(val) {
        return val.replace(/^([A-Z])|[\s-_](\w)/g, function(match, p1, p2, offset) {
            if (p2) {
                return p2.toUpperCase();
            }
            
            return p1.toLowerCase();        
        });
    }

    Modal.prototype.register = function(name) {
        var i,
            ccName = _toCamelCase(name),
            modals = {};

        for (i in this.modals) {
            modals[i] = this.modals[i];
        }

        modals[ccName] = {
            visible: false,
            name: name,
            data: {}
        };

        this.modals = modals;

        return ccName;
    };

    Modal.prototype.show = function(name, data, overlap) {
        name = _toCamelCase(name);
        overlap = overlap === true ? true : false;

        if ( ! overlap) {
            this.hide(null, true);
        }

        this.modals[name].visible = true;
        this.modals[name].data = data || {};

        document.body.style.overflow = 'hidden';
    };

    Modal.prototype.hide = function(name, reset) {
        var i;

        if (name) {
            name = _toCamelCase(name);

            this.modals[name].visible = false;

            // If there is still a modal open we don't
            // want to restore the body's overflow.
            for (i in this.modals) {
                if (this.modals[i].visible === true) {
                    return;
                }
            }
        }
        else {
            for (i in this.modals) {
                this.modals[i].visible = false;
            }
        }

        if ( ! reset) {

            // Since our transitions are .4s
            // This will avoid seeing double scrollbars (nicer transition).
            setTimeout(function () {
                document.body.style.overflow = '';
            }, 450);
        }
    }

    Modal.prototype.data = function(name) {
        name = _toCamelCase(name);

        return this.modals[name].data || {};
    }

    Modal.prototype.visible = function(name) {
        name = _toCamelCase(name);

        return this.modals[name].visible;
    }

    Modal.prototype.context = function(ctx) {
        if ( ! this.set) {
            ctx[ctx.set ? 'set' : '$set']('__modal', this);
            this.set = true;
        }
    };

    function install(Vue) {
        if (Vue.modal) { return true; }

        var modal = new Modal;

        Vue.modal = Modal;

        Vue.component('modal', require('./modals/Shell.vue'));

        Object.defineProperties(Vue.prototype, {
            $modal: {
                get: function () {
                    modal.context(this);

                    return modal;
                }
            }
        });
    }

    Vue.use(install);

    return install;
})();