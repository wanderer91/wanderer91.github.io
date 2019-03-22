window.Vue = require('vue/dist/vue.min.js');
window.BootstrapVue = require('bootstrap-vue/dist/bootstrap-vue');
window.VueRouter = require('vue-router');
window.VueX = require('vuex');

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueX);

import Scheduler from './components/Scheduler.vue';

let app = new Vue({
   el: '#app',

    data () {

    },

    mounted () {

    },
    components: {Scheduler}
});