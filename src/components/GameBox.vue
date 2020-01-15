<template>
    <!-- 靶机信息 -->
    <v-row align="center">
        <div v-if="gameBoxes.length > 0">
            <v-list-item v-for="gameBox in gameBoxes" :key="gameBox.ID">
                <v-list-item-content>
                    <v-list-item-title v-text="gameBox.Title"/>
                    <v-list-item-subtitle>{{gameBox.IP}}:{{gameBox.Port}}</v-list-item-subtitle>
                    <v-list-item-subtitle>{{gameBox.Score}} 分</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <div v-if="!gameBox.IsAttacked && !gameBox.IsDown">
                        <v-chip class="ma-2" color="green" text-color="green" style="width: 85px; text-align: center;" outlined>
                            Online
                        </v-chip>
                    </div>
                    <div v-else-if="gameBox.IsDown">
                        <v-chip class="ma-2" color="orange" text-color="orange" style="width: 85px; text-align: center;" outlined>
                            Down
                        </v-chip>
                    </div>
                    <div v-else-if="gameBox.IsAttacked">
                        <v-chip class="ma-2" color="red" text-color="red" style="width: 85px; text-align: center;" outlined>
                            Attacked
                        </v-chip>
                    </div>
                </v-list-item-action>
            </v-list-item>
        </div>
        <v-list-item v-else>
            <p>暂时还没有题目哟~</p>
        </v-list-item>
    </v-row>
</template>

<script>
    export default {
        name: "GameBox",

        data() {
            return {
                gameBoxes: null
            }
        },

        mounted() {
            this.utils.GET("/team/gameboxes").then(res => {
                this.gameBoxes = res
            })
        }
    }
</script>

<style scoped>

</style>