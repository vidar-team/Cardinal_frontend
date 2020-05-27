<template>
    <v-content>
        <v-snackbar v-model="messageBar" color="error" :timeout="2000" :top="true">{{ message }}</v-snackbar>

        <v-row align="center" justify="center" style="margin-top: 12%;">
            <h1 class="display-2 font-weight-thin">{{base.Title}}</h1>
        </v-row>
        <br>
        <v-card class="mx-auto" max-width="400">
            <v-card-title>{{$t('login.title')}}</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field
                            v-model="inputForm.Name"
                            :rules="nameRules"
                            :label="$t('login.account')"
                            required
                            autocomplete="off"
                    />
                    <v-text-field
                            v-model="inputForm.Password"
                            :rules="passwordRules"
                            :label="$t('login.password')"
                            type="password"
                            required
                            autocomplete="off"
                    />
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-btn text color="primary" @click="onLogin">{{$t('login.login')}}</v-btn>
                <v-btn text @click="onReset">{{$t('login.reset')}}</v-btn>
            </v-card-actions>
        </v-card>
        <div class="mt-8 text-center">Copyright © 2020 Cardinal</div>

        <!-- 登录等待 -->
        <v-dialog v-model="isLoading" hide-overlay persistent width="300">
            <v-card dark>
                <v-card-text>
                    <p>{{$t('login.loading')}}</p>
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

                base: {
                    Title: ''
                },

                nameRules: [
                    v => !!v || this.$i18n.t('login.account_empty')
                ],
                passwordRules: [
                    v => !!v || this.$i18n.t('login.password_empty')
                ],
                inputForm: {
                    Name: '',
                    Password: ''
                }
            }
        },

        created() {
            this.utils.GET('/base').then(res => {
                this.base = res
            }).catch(() => this.base.Title = 'Cardinal')
        },

        methods: {
            onLogin() {
                if (!this.$refs.form.validate()) {
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