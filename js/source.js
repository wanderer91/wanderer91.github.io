let Vue = require('vue/dist/vue.min.js');
let BootstrapVue = require('bootstrap-vue/dist/bootstrap-vue');
let VueRouter = require('vue-router');
let VueX = require('vuex');

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueX);

import Scheduler from './components/Scheduler.vue';

let store = new VueX.Store({
    state: {
        selectedTimes: {}
    }
});

let app = new Vue({
   el: '#app',

    store,

    components: {Scheduler}
});