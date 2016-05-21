# vue-modal

Simple modal plugin with some nice hooks for toggling modal.

## Install

The plugin will self install. However it also comes with some additional pre made modals.

~~~
import {modalSlide} from 'vue-modal';
Vue.component('modal-slide-show', modalSlide);
~~~

For now it's just a slide show.

## Example

**Plain Modal:**

* The modals have events that cant be captured.
* They can also accept any arbitrary data.

~~~
<template>
    <div v-on:click="$modal.show('login')">login</div>
    <div v-on:click="$modal.show('register', {boo: 'yaa'})">register</div>

    <modal name="login">
        <div slot="content">
            // login html
        </div>
    </modal>
</template>

<script>
    export default {
        modals: {
            login: {
                onShow: function () {
                    console.log('show');
                },
                onHide: function () {
                    console.log('hide');
                }
            },
            register: {
                onShow: function () {
                    console.log(this.$modal.data('register'));
                }
            }
        }
    }
</script>
~~~

**Slideshow:**

If no index is provided it will just go to `0` on start.

~~~
<template>
    <div v-for="(index, video) in videos" v-on:click="$modal.show('videos-slide-show', {index: index})">{{ video.name }}</div>
    <modal-slide-show name="videos-slide-show" :data="videos"></modal-slide-show>
</template>

<script>
    export default {
        data: function () {
            return {
                videos: [{
                    link: 'http://somelink.com/123',
                    name: 'zero'
                }, {
                    link: 'http://somelink.com/456',
                    name: 'one'
                }]
            };
        }
    }
</script>
~~~

## Methods

There are also some other methods available. Probably they will not be required unless building a more generic style plugin.

* `$modal.show(name, data, overlap)`
* `$modal.hide(name, reset)`
* `$modal.data(name)`
* `$modal.visible(name)`
* `$modal.register(name)`