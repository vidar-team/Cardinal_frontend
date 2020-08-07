<template>
    <v-card class="mx-auto" v-if="info !== null">
        <v-snackbar v-model="snackBarVisible" color="error" :timeout="3000" :top="true">{{ message }}</v-snackbar>

        <v-card-title>
            <span style="margin-right: 20px;">{{$t('flag.submit')}}</span>
            <v-text-field
                    v-model="inputFlag"
                    label="手动提交"
                    clearable
            ></v-text-field>
            <v-btn style="margin-left: 20px;" @click="submitFlag">提交</v-btn>
        </v-card-title>
        <v-card-text>
            <h2>POST <code style="background-color: #1c1c1c">/flag</code></h2><br>
            <p>Content-Type: application/json</p>
            <p>Header:
            <pre>Authorization: {{info.Token}}</pre>
            </p>
            <p>Body:</p>
            <code class="pa-3" style="width: 100%; background-color: #1c1c1c; color: rgba(255, 255, 255, 0.7);">{"flag":
                "your_flag_here"}</code>
            <br><br>
            <v-divider></v-divider>
            <br>
            <p>
                <code class="pa-3" style="width: 100%; background-color: #1c1c1c; color: rgba(255, 255, 255, 0.7);">curl
                    -X POST {{baseURL}}/api/flag -H 'Authorization: {{info.Token}}' -d '{ "flag": "your_flag_here"
                    }'</code>
            </p>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "SubmitFlag",

        data: () => ({
            info: null,
            inputFlag: '',
            baseURL: window.location.origin,

            message: '',
            snackBarVisible: false,
        }),

        mounted() {
            this.getInfo()
        },

        methods: {
            getInfo() {
                this.utils.GET("/team/info").then(res => {
                    this.info = res
                })
            },
            submitFlag() {
                this.utils.POST('/flag', {
                    'flag': this.inputFlag
                }).then(res => {
                    this.inputFlag = ''
                    this.message = res
                    this.snackBarVisible = true
                }).catch(err => {
                    this.message = err.response.data.msg
                    this.snackBarVisible = true
                })
            }
        }
    }
</script>

<style scoped>

</style>