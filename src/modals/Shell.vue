<template>
    <div v-show="show" class="vue-modal-mask" v-on:click.stop="hide()" :transition="transition">
        <div class="vue-modal-close">x</div>

        <div class="vue-modal-wrapper">
            <div class="vue-modal-container" v-on:click.stop="nothing()">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['name', 'transition'],
        data: function () {
            return {
                show: false,
                transition: this.transition || 'slide-down'
            };
        },
        ready() {
            var name = this.$modal.register(this.name),
                funcs = this.$parent.$options.modals;

            this.$watch('$modal.modals.' + name + '.visible', function(newVal, oldVal) {
                this.show = newVal;

                if ( ! funcs || ! funcs[this.name]) { return; }

                if (newVal === true && oldVal === false && funcs[this.name].onShow) {
                    funcs[this.name].onShow.call(this.$parent);
                }
                else if (newVal === false && oldVal === true && funcs[this.name].onHide) {
                    funcs[this.name].onHide.call(this.$parent);
                }
            });
        },
        methods: {
            hide() {
                this.$modal.hide(this.name);
            },
            nothing() {
                // Null;
            }
        }
    }
</script>

<style>
    .vue-modal-mask {
        position: fixed;
        z-index: 10000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .7);
        transition: opacity .3s ease;
        overflow-y: scroll;
    }
    .vue-modal-mask > .vue-modal-wrapper {
        display:table;
        margin: 0 auto;
        height: 100%;
        max-width: 600px;
        transition: margin-top .4s ease;
        overflow: hidden;
    }
    .vue-modal-mask > .vue-modal-wrapper > .vue-modal-container {
        display:table-cell;
        vertical-align:middle;
    }
    .vue-modal-mask > .vue-modal-close {
        position: fixed;
        right: 30px;
        top: 10px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        font-family: verdana;
        cursor: pointer;
        z-index: 10001;
    }

    /* transitions */
    .slide-down-enter.vue-modal-mask,
    .slide-down-leave.vue-modal-mask {
        opacity: 0;
    }
    .slide-down-enter .vue-modal-wrapper,
    .slide-down-leave .vue-modal-wrapper {
        margin-top: -500px;
    }

    /*.center-pop-enter.vue-modal-mask,
    .center-pop-leave.vue-modal-mask {
        opacity: 0;
    }
    .center-pop-enter .vue-modal-wrapper,
    .center-pop-leave .vue-modal-wrapper {
        max-width: 0px;
    }*/
</style>