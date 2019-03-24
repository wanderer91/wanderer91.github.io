<template>
    <div class="container d-md-flex align-items-start scheduler">
        <div class="scheduler__wrapper">
            <h1 class="scheduler__title">
                Select a Date for your Free LASIK Exam
            </h1>
            <date-picker inline="true" :calendar-class="calendarOptions.class" format="d M yyyy"
                         :value="$store.getters.NOW_DATE"
                         :day-cell-content="getCellContent"
                         :disabledDates="calendarOptions.disabledDates" @changedMonth="monthSelected"></date-picker>
        </div>
        <div class="scheduler__times d-flex flex-wrap">
            <h2 class="scheduler__times-title">
                Select a time on {{ $store.getters.MONTH }}{{ day ? ' ' + $store.getters.DAY + 'th' : '' }},
                {{ $store.getters.YEAR }} that works best for you!
            </h2>
            <div class="scheduler__times-item col-4 col-md-6 col-lg-2" v-for="(time, i) in $store.getters.DAY_TIMES"
                 v-bind:class="{'scheduler__times-item_disabled': ($store.state.selectedTimes[$store.state.nowDateString] || []).indexOf(time) > -1}"
                v-if="day">
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
            return {
                calendarOptions: {
                    class: 'scheduler__calendar',
                    day: null,
                    month: null,
                    disabledDates: {
                        ranges: [{
                            from: new Date(1970, 0, 1)
                        }, {
                            to: new Date(2038, 11, 31)
                        }],
                        dates: []
                    }
                }
            }
        },

        beforeMount() {
            const nowDate = new Date();

            if (this.$route.params.day) {
                this.day = this.$route.params.day;
                nowDate.setDate(this.$route.params.day);
            }

            if (this.$route.params.month) {
                this.month = this.$route.params.month;
                nowDate.setMonth(this.$route.params.month - 1);
            }

            if (!this.day) {
                this.calendarOptions.class += ' scheduler__calendar_only-month';
            }

            const nowYear = nowDate.getFullYear();

            this.calendarOptions.disabledDates.ranges[0].to = new Date(nowYear, 0, 1);
            this.calendarOptions.disabledDates.ranges[1].from = new Date(nowYear + 1, 0, 1);
            this.calendarOptions.disabledDates.dates = this.$store.getters.DISABLED_DATES;

            this.$store.commit('SET_DATE', nowDate);
        },

        mounted() {
            window.$vm = this;
        },

        methods: {
            getCellContent(date) {
                if (date.isDisabled) {
                    return date.date;
                }
                let d = new Date();
                d.setTime(date.timestamp);

                return '<a href="#/' + d.getDate() + '/' + (d.getMonth() + 1) + '">' + date.date + '</a>';
            },

            selectTime(event) {
                const timeIndex = event.target.dataset.index;

                this.$store.commit('ADD_TIME', this.$store.getters.DAY_TIMES[timeIndex]);

                if ((this.$store.state.selectedTimes[this.$store.state.nowDateString] || []).length == this.$store.getters.DAY_TIMES.length) {
                    this.$store.commit('DISABLE_CURR_DATE');
                }

                this.$forceUpdate();
            },
            monthSelected (data) {
                let nowDate = this.$store.getters.NOW_DATE;

                const month = data instanceof Date ? data.getMonth() : this.$store.state.months.indexOf(data.month);
                nowDate.setMonth(month);

                this.$store.commit('SET_DATE', nowDate);
                this.$router.push('/' + (month + 1));
            }
        }
    }

</script>

<style scoped>

</style>