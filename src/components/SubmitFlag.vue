<template>
    <v-card class="mx-auto">
        <v-card-title>提交 Flag</v-card-title>
        <v-card-text>
            <h2>POST <code style="background-color: #1c1c1c">/flag</code></h2><br>
            <p>Content-Type: application/json</p>
            <p>Header:<pre>Authorization: {{info.Token}}</pre></p>
            <p>Body:</p>
            <code class="pa-3" style="width: 100%; background-color: #1c1c1c; color: rgba(255, 255, 255, 0.7);">{"flag": "your_flag_here"}</code>
            <br><br>
            <v-divider></v-divider>
            <br>
            <p>
                <code class="pa-3" style="width: 100%; background-color: #1c1c1c; color: rgba(255, 255, 255, 0.7);">curl -X POST {{utils.baseURL}}/flag -H 'Authorization: {{info.Token}}' -d '{ "flag": "your_flag_here" }'</code>
            </p>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "SubmitFlag",

        data: () => ({
            info: null
        }),

        mounted() {
            this.getInfo()
        },

        methods:{
            getInfo(){
                this.utils.GET("/team/info").then(res => {
                    this.info = res
                })
            }
        }
    }
</script>

<style scoped>

</style>