<template>
    <v-container>
        <v-simple-table dark v-if="rankList !== null">
            <thead>
            <tr>
                <th class="text-center">{{$t('rank.rank')}}</th>
                <th class="text-center">{{$t('rank.team')}}</th>
                <th class="text-center">{{$t('rank.score')}}</th>
                <th class="text-center" v-bind:key="index" v-for="(header,index) in this.rankHeader">
                    {{header}}
                </th>
            </tr>
            </thead>
            <tbody class="text-center">
            <tr v-for="(item, key) in this.rankList" :key="item.ID">
                <td>{{key + 1}}</td>
                <td>{{item.TeamName}}</td>
                <td>{{utils.FormatFloat(item.Score)}}</td>
                <td v-bind:key="index" v-for="(gameBox, index) in item.GameBoxStatus">
                    <v-icon color="green lighten-2" v-if="!gameBox.IsDown && !gameBox.IsAttacked">mdi-check-circle</v-icon>
                    <v-icon color="yellow lighten-2" v-if="gameBox.IsDown">mdi-file-cancel</v-icon>
                    <v-icon color="red lighten-2" v-if="gameBox.IsAttacked">mdi-ghost</v-icon>
                </td>
            </tr>
            </tbody>
        </v-simple-table>
        <v-skeleton-loader v-else class="mx-auto" type="article"></v-skeleton-loader>
    </v-container>
</template>

<script>
    export default {
        name: "Rank",

        data: () => ({
            timer: null,
            rankHeader: null,
            rankList: null
        }),

        mounted() {
            this.getRank()
            this.timer = setInterval(this.getRank, 5000)
        },

        beforeDestroy() {
            clearInterval(this.timer)
        },

        methods: {
            getRank() {
                this.utils.GET('/team/rank').then(res => {
                    this.rankHeader = res.Title
                    this.rankList = res.Rank
                })
            }
        }
    }
</script>

<style scoped>
    .logo {
        float: left;
        width: 50px;
        height: 50px;
    }
</style>