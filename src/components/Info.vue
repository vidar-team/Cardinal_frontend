<template>
    <v-card v-if="info !== null">
        <v-list-item two-line>
            <v-list-item-content>
                <div>
                    <v-img v-if="info.Logo !== ''" class="logo" :src="`${utils.baseURL}/uploads/${info.Logo}`"></v-img>
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
            <v-btn text/>
        </v-card-actions>
    </v-card>
</template>

<script>
    import GameBox from "./GameBox";

    export default {
        name: "Info",
        data() {
            return {
                info: null
            }
        },
        mounted() {
            this.utils.GET("/team/info").then(res => {
                this.info = res
            })
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