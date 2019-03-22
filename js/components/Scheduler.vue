<template>
    <div class="container d-md-flex align-items-start scheduler">
        <div class="scheduler__wrapper">
            <h1 class="scheduler__title">
                Select a Date for your Free LASIK Exam
            </h1>
            <date-picker inline="true" calendar-class="scheduler__calendar" format="d M yyyy" :value="calendarState.nowDate"
                         :day-cell-content="getCellContent"
                         :disabledDates="calendarState.disabledDates"></date-picker>
        </div>
        <div class="scheduler__times d-flex flex-wrap">
            <h2 class="scheduler__times-title">
                Select a time on {{ months[calendarState.nowDate.getMonth()] }} {{ calendarState.nowDate.getDate() }}th,
                {{ calendarState.nowDate.getFullYear() }} that works best for you!
            </h2>
            <div class="scheduler__times-item col-4 col-md-6 col-lg-2" v-for="(time, i) in dayTimes"
                 v-bind:class="{'scheduler__times-item_disabled': $store.state.selectedTimes[calendarState.nowDateString] && $store.state.selectedTimes[calendarState.nowDateString].indexOf(time) > -1}">
                <a href="#" @click.prevent="selectTime" :data-index="i">{{ time }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    import DatePicker from 'vuejs-datepicker';

    export default {
        name: "Scheduler",

        components: {DatePicker},

        data() {
            const nowDate = new Date();
            const nowYear = nowDate.getFullYear();
            const nowDateString = nowDate.getMonth() + '-' + nowDate.getUTCDate() + '-' + nowDate.getFullYear();

            return {
                months: {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'},
                dayTimes: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM'],
                calendarState: {
                    nowDate: nowDate,
                    nowDateString: nowDateString,
                    disabledDates: {
                        ranges: [{
                            from: new Date(1970, 0, 1),
                            to: new Date(nowYear, 0, 1), // Disable all dates up to specific date
                        }, {
                            from: new Date(nowYear + 1, 0, 1),
                            to: new Date(2038, 11, 31)
                        }]
                    }
                }
            }
        },

        mounted () {

        },

        methods: {
            getCellContent (date) {
                if (date.isDisabled) {
                    return date.date;
                }
                let d = new Date();
                d.setTime(date.timestamp);
                return '<a href="' + d.getUTCMonth() + '/' + d.getUTCDate() + '">' + date.date + '</a>';
            },

            selectTime (event) {
                const timeIndex = event.target.dataset.index;

                let selectedTimes = this.$store.state.selectedTimes;
                if (!selectedTimes[this.calendarState.nowDateString]) {
                    selectedTimes[this.calendarState.nowDateString] = [];
                }

                selectedTimes[this.calendarState.nowDateString].push(this.dayTimes[timeIndex]);

                this.$forceUpdate();
            }
        }
    }

</script>

<style scoped>

</style>