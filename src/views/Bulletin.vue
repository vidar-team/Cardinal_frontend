<template>
    <div>
        <v-container>
            <div>
                <h2 v-if="bulletinList !== null && bulletinList.length === 0" class="text-center font-weight-thin mt-5">
                    {{$t('bulletin.empty')}}
                </h2>
                <v-timeline align-top dense v-else>
                    <v-timeline-item v-for="(item, index) in bulletinList" :key="index" color="dark" icon="mdi-bullhorn" fill-dot>
                        <v-card dark>
                            <v-card-title class="title">{{item.Title}}<span class="font-weight-thin ml-5" style="font-size: 15px;">{{item.CreatedAt}}</span></v-card-title>
                            <v-card-text class="text--primary">{{item.Content}}</v-card-text>
                        </v-card>
                    </v-timeline-item>
                </v-timeline>
            </div>

            <v-skeleton-loader
                    v-if="bulletinList === null"
                    class="mx-auto"
                    type="article"
            ></v-skeleton-loader>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Bulletin",

        data: () => ({
            bulletinList: null
        }),

        mounted() {
            this.getBulletin()
        },

        methods: {
            getBulletin(){
                this.utils.GET('/team/bulletins').then(res => {
                    this.bulletinList = res
                })
            }
        }
    }
</script>

<style scoped>

</style>