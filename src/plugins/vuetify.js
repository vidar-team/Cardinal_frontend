import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify, {
    icons: {
        iconfont: 'mdi', // default - only for display purposes
    },
})

export default new Vuetify({
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: "#00a0e9"
            }
        }
    },
})