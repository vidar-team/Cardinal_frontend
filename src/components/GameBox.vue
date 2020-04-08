<template>
    <div>
        <!-- 靶机信息 -->
        <div v-if="gameBoxes !== null">
            <v-list-item v-for="gameBox in gameBoxes" :key="gameBox.ID"
                         @click="()=>{gameBoxDetail = gameBox; showDetail = true}">
                <v-list-item-content>
                    <v-list-item-title v-text="gameBox.Title"/>
                    <v-list-item-subtitle>{{gameBox.IP}}:{{gameBox.Port}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{utils.FormatFloat(gameBox.Score)}} {{$t('general.score')}}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <div v-if="!gameBox.IsAttacked && !gameBox.IsDown">
                        <v-chip class="ma-2" color="green" text-color="green" outlined>Online</v-chip>
                    </div>
                    <div v-if="gameBox.IsDown">
                        <v-chip class="ma-2" color="orange" text-color="orange" outlined>Down</v-chip>
                    </div>
                    <div v-if="gameBox.IsAttacked">
                        <v-chip class="ma-2" color="red" text-color="red" outlined>Attacked</v-chip>
                    </div>
                </v-list-item-action>
            </v-list-item>
        </div>
        <v-list-item v-if="gameBoxes === null || gameBoxes.length === 0">
            <p>{{$t('gamebox.empty')}}</p>
        </v-list-item>

        <!-- 靶机详细信息 -->
        <v-dialog width="500" v-model="showDetail">
            <v-card>
                <v-card-title class="headline" primary-title>
                    {{gameBoxDetail.Title}}
                </v-card-title>
                <v-card-text>
                    <p><b>{{gameBoxDetail.IP}}:{{gameBoxDetail.Port}}</b></p>
                    <v-textarea filled auto-grow rows="4" shaped :disabled="true"
                                v-model="gameBoxDetail.Description"></v-textarea>
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn color="primary" text @click="showDetail = false">{{$t('general.close')}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "GameBox",

        data() {
            return {
                showDetail: false,
                gameBoxes: null,
                gameBoxDetail: {
                    Title: '',
                    TargetIP: '',
                    TargetPort: '',
                    Describe: ''
                },

                timer: null,
            }
        },

        mounted() {
            this.getGameboxes()
            this.timer = setInterval(this.getGameboxes, 5000)
        },

        beforeDestroy() {
            clearInterval(this.timer)
        },

        methods: {
            getGameboxes() {
                this.utils.GET("/team/gameboxes").then(res => {
                    this.gameBoxes = res
                })
            }
        }
    }
</script>

<style scoped>

</style>