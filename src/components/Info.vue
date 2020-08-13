<template>
    <div>
        <v-dialog
                v-model="showGameBoxesVisible"
                width="700"
        >
            <v-card>
                <v-card-title class="headline">
                    {{$t('gamebox.list')}}
                </v-card-title>

                <v-card-text>
                    <v-simple-table :dense="true">
                        <template v-slot:default>
                            <thead>
                            <tr>
                                <th class="text-left">{{$t('gamebox.team')}}</th>
                                <th class="text-left">{{$t('gamebox.challenge')}}</th>
                                <th class="text-left">{{$t('gamebox.address')}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in allGameBoxes" v-bind:key="index">
                                <td>{{ item.TeamName }}</td>
                                <td>{{ item.ChallengeName }}</td>
                                <td>{{ item.IP }}:{{ item.Port }}</td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="showGameBoxesVisible = false">
                        {{$t('general.close')}}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-card v-if="info !== null">
            <v-list-item two-line>
                <v-list-item-content>
                    <div>
                        <v-img v-if="info.Logo !== ''" class="logo"
                               :src="`${utils.baseURL}/uploads/${info.Logo}`"></v-img>
                        <v-list-item-title class="headline">{{info.Name}}</v-list-item-title>
                        <v-list-item-subtitle>
                            Token {{ info.Token }}
                        </v-list-item-subtitle>
                    </div>
                </v-list-item-content>
            </v-list-item>

            <v-card-text>
                <GameBox/>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-list-item>
                    #{{ info.Rank }} / {{ utils.FormatFloat(info.Score) }} {{$t('general.score')}}
                </v-list-item>
                <v-btn v-if="allGameBoxes !== null" text @click="showGameBoxesVisible = true">靶机列表</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import GameBox from "./GameBox";

    export default {
        name: "Info",
        data() {
            return {
                info: null,
                timer: null,
                allGameBoxes: null,

                showGameBoxesVisible: false,
            }
        },
        mounted() {
            this.timer = setInterval(this.getInfo, 5000)
            this.getInfo()
            this.getAllGameBoxes()
        },

        beforeDestroy() {
            clearInterval(this.timer)
        },

        methods: {
            getInfo() {
                this.utils.GET("/team/info").then(res => {
                    this.info = res
                })
            },

            getAllGameBoxes() {
                this.utils.GET("/team/gameboxes/all").then(res => {
                    this.allGameBoxes = res
                }).catch(() => {
                    this.allGameBoxes = null
                })
            }
        },
        components: {GameBox}
    }
</script>

<style scoped>
    .logo {
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 5px;
    }
</style>