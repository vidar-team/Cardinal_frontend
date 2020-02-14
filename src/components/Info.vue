<template>
    <v-card  v-if="info !== null">
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline">{{info.Name}}</v-list-item-title>
                <v-list-item-subtitle>Token: {{info.Token}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-card-text>
            <GameBox/>
        </v-card-text>
        <v-divider/>
        <v-card-actions>
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

</style>