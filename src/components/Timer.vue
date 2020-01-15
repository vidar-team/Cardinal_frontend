<template>
    <v-card-text class="text-center" v-if="time !== null">
        <div v-if="time.Status === 'on'">
            <div>距离第 {{time.NowRound}} 轮结束还有</div>
            <p class="display-1 text--primary">
                {{minute}} 分 {{second}} 秒
            </p>
        </div>
        <div v-else-if="time.Status === 'wait'">
            <p class="display-1 text--primary">
                比赛未开始
            </p>
        </div>
        <div v-else-if="time.Status === 'pause'">
            <p class="display-1 text--primary">
                比赛已暂停
            </p>
        </div>
        <div v-else-if="time.Status === 'end'">
            <p class="display-1 text--primary">
                比赛已结束
            </p>
        </div>
    </v-card-text>
</template>

<script>
    export default {
        name: "Timer",
        data(){
            return{
                time: null,
                minute: 0,
                second: 0,
            }
        },
        mounted() {
            this.utils.GET("/time").then(res => {
                this.time = res
                this.timeTick()
            })
        },

        methods:{
            // 时间倒数
            timeTick(){
                this.remainTime = this.time.RoundRemainTime--
                this.minute = Math.floor(this.remainTime / 60)
                this.second = this.remainTime - this.minute * 60
                if(this.remainTime <= 0){
                    this.time.remainTime = this.time.Duration * 60
                    this.time.NowRound++
                }
                return setTimeout(this.timeTick, 1000);
            }
        },
    }
</script>

<style scoped>

</style>