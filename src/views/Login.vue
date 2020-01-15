<template>
    <v-content>
        <v-snackbar v-model="messageBar" color="error" :timeout="2000" :top="true">{{ message }}</v-snackbar>

        <v-row align="center" justify="center" style="margin-top: 12%;">
            <h1 class="display-2 font-weight-thin">HCTF</h1>
        </v-row>
        <br>
        <v-card class="mx-auto" max-width="400">
            <v-card-title>登录</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                            v-model="inputForm.Name"
                            :rules="nameRules"
                            label="账号"
                            required
                            autocomplete="off"
                    />
                    <v-text-field
                            v-model="inputForm.Password"
                            :rules="passwordRules"
                            label="密码"
                            type="password"
                            required
                            autocomplete="off"
                    />
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn text color="primary" @click="onLogin">登录</v-btn>
                <v-btn text @click="onReset">重置</v-btn>
            </v-card-actions>
        </v-card>
        <div class="mt-8 text-center">Copyright © 2020 Cardinal</div>

        <!-- 登录等待 -->
        <v-dialog v-model="isLoading" hide-overlay persistent width="300">
            <v-card dark>
                <v-card-text>
                    <p>登录中.....</p>
                    <v-progress-linear indeterminate color="white" class="mb-0"/>
                </v-card-text>
            </v-card>
        </v-dialog>

    </v-content>
</template>

<script>
    /* eslint-disable */
    export default {
        name: "Login",

        data() {
            return {
                isLoading: false,
                messageBar: false,
                message: '',

                nameRules: [
                    v => !!v || '请输入账号'
                ],
                passwordRules: [
                    v => !!v || '请输入密码'
                ],
                inputForm: {
                    Name: '',
                    Password: ''
                }
            }
        },

        methods: {
            onLogin() {
                if(!this.$refs.form.validate()){
                    return
                }
                this.utils.POST("/login", this.inputForm, false).then(res => {
                    localStorage.setItem('token', res)
                    this.$router.push('/')
                }).catch(err => {
                    this.messageBar = true
                    this.message = err.response.data.msg
                })
            },
            onReset() {
                this.inputForm = {
                    Name: '',
                    Password: ''
                }
            }
        }
    }
</script>

<style scoped>

</style>