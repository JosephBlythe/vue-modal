<template>
    <modal :name="name" :transition="transition || 'slide-down'">
        <div slot="content">
            <iframe v-if="data && !type"
                src="{{ src }}"
                class="modal-slide-show-iframe"
                width="{{ this.width || 400 }}"
                height="{{ this.width || 300 }}"
                marginwidth="0"
                marginheight="0"
                align="top"
                scrolling="No"
                frameborder="0"
                hspace="0"
                vspace="0"
            >
            </iframe>

            <img v-if="data && type === 'image'"
                src="{{ src }}"
                width="{{ this.width || 400 }}"
            />
            
            <div v-if="!data" class="modal-slide-show-no-data">
                No data loaded.
            </div>

            <div v-if="data.length > 1" class="modal-slide-show-previous">
                <div>
                    <div v-on:click.stop="previous()">&lsaquo;</div>
                </div>
            </div>
            <div v-if="data.length > 1" class="modal-slide-show-next">
                <div>
                    <div v-on:click.stop="next()">&rsaquo;</div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        props: ['name', 'transition', 'data', 'type', 'width', 'height'],
        data: function () {
            return {
                index: 0,
                src: null
            };
        },
        ready() {
            var modals = this.$parent.$options.modals;

            this.$options.modals[this.name] = {
                onShow() {
                    var index = this.$modal.data(this.name).index;

                    this.index = index !== undefined ? index : this.index;
                    this.updateSrc();

                    if (modals && modals[this.name] && modals[this.name].onShow) {
                        modals[this.name].onShow.call(this.$parent);
                    }
                },
                onHide() {
                    this.src = null;

                    if (modals && modals[this.name] && modals[this.name].onHide) {
                        modals[this.name].onHide.call(this.$parent);
                    }
                }
            };
        },
        methods: {
            updateSrc() {
                this.src = this.data[this.index].link;
            },
            previous() {
                if (this.index === 0) {
                    this.index = this.data.length - 1;
                }
                else {
                    this.index = this.index - 1;
                }

                this.updateSrc();
            },
            next() {
                if (this.index === (this.data.length - 1)) {
                    this.index = 0;
                }
                else {
                    this.index = this.index + 1;
                }

                this.updateSrc();
            }
        },
        modals: {}
    }
</script>

<style>
    .modal-slide-show-next,
    .modal-slide-show-previous {
        position: fixed;
        display: table;
        top: 0px;
        height: 100%;
        font-size: 30px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 40px;
        font-family: verdana;
    }

    .modal-slide-show-next > div,
    .modal-slide-show-previous > div {
        display: table-cell;
        vertical-align: middle;
    }
    .modal-slide-show-next > div > div,
    .modal-slide-show-previous > div > div {
        height: 100px;
        line-height: 100px;
        cursor: pointer;
    }

    .modal-slide-show-next {
        right: 20px;
        width: 80px;
    }

    .modal-slide-show-previous {
        width: 100px;
        left: 0px;
    }
    .modal-slide-show-no-data {
        font-size:16px;
        color: #fff;
    }
    .modal-slide-show-iframe {
        background: #333;
    }
</style>