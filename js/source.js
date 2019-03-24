let Vue = require('vue/dist/vue.min.js');
let VueRouter = require('vue-router/dist/vue-router.min.js');
let VueX = require('vuex');

Vue.use(VueX);
Vue.use(VueRouter);

import Scheduler from './components/Scheduler.vue';

let router = new VueRouter({
    routes: [
        {path: '/:day/:month', component: Scheduler},
        {path: '/:month', component: Scheduler},
        {path: '/', component: Scheduler}
    ]
});

let store = new VueX.Store({
    state: {
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        dayTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
        nowDate: null,
        nowDateString: '',
        selectedTimes: {},
        disabledDates: []
    },
    getters: {
        DAY: state => state.nowDate.getDate(),
        MONTH: state => state.months[state.nowDate.getMonth()],
        YEAR: state => state.nowDate.getFullYear(),
        NOW_DATE: state => state.nowDate,
        DAY_TIMES: state => state.dayTimes,
        DISABLED_DATES: state => state.disabledDates
    },
    mutations: {
        ADD_TIME: (state, time) => {
            state.selectedTimes[state.nowDateString] = state.selectedTimes[state.nowDateString] || [];

            if (state.selectedTimes[state.nowDateString].indexOf(time) == -1) {
                state.selectedTimes[state.nowDateString].push(time);
            }
        },
        SET_DATE: (state, date) => {
            state.nowDate = date;
            state.nowDateString = date.getMonth() + '-' + date.getUTCDate() + '-' + date.getFullYear();
        },
        DISABLE_CURR_DATE: state => {
            if (state.disabledDates.indexOf(state.nowDate) < 0) {
                state.disabledDates.push(state.nowDate);
            }
        }
    }
});

new Vue({
    el: '#app',
    router,
    store
});