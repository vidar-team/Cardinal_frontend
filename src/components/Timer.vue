<template>
    <v-card-text class="text-center" v-if="time !== null">
        <div v-if="time.Status === 'on'">
            <div>{{$t('timer.til_round_end',{round: time.NowRound})}}</div>
            <p class="display-1 text--primary">
                {{minute}} {{$t('general.minute')}} {{second}} {{$t('general.second')}}
            </p>
        </div>
        <div v-else-if="time.Status === 'wait'">
            <p class="display-1 text--primary">
                {{$t('timer.not_begin')}}
            </p>
        </div>
        <div v-else-if="time.Status === 'pause'">
            <p class="display-1 text--primary">
                {{$t('timer.pause')}}
            </p>
        </div>
        <div v-else-if="time.Status === 'end'">
            <p class="display-1 text--primary">
                {{$t('timer.end')}}
            </p>
        </div>
    </v-card-text>
</template>

<script>
    export default {
        name: "Timer",
        data() {
            return {
                timer: null,
                requestTimer: null,

                time: null,
                minute: 0,
                second: 0,
            }
        },
        mounted() {
            this.getTime()
            this.requestTimer = setInterval(this.getTime, 10000)
            this.timer = setInterval(this.timeTick, 1000)
        },

        beforeDestroy() {
            clearInterval(this.requestTimer)
            clearInterval(this.timer)
        },

        methods: {
            getTime() {
                this.utils.GET("/time").then(res => {
                    this.time = res
                    this.timeTick()
                })
            },

            // 时间倒数
            timeTick() {
                this.time.RoundRemainTime--
                this.minute = Math.floor(this.time.RoundRemainTime / 60)
                this.second = this.time.RoundRemainTime - this.minute * 60
                if (this.time.RoundRemainTime <= 0) {
                    this.time.RoundRemainTime = this.time.Duration * 60
                    this.time.NowRound++
                }
            }
        },
    }
</script>

<style scoped>

</style>