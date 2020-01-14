<template>
    <div id="app">
        <v-app>
            <v-app-bar app clipped-left color="transparent">
                <v-toolbar-title>HCTF</v-toolbar-title>
                <v-toolbar-items class="ml-5">
                    <v-btn text to="/">靶机状态</v-btn>
                    <v-btn text to="/rank">排名</v-btn>
                    <v-btn text to="/bulletin">公告</v-btn>
                    <v-btn text @click="onLogout">登出</v-btn>
                </v-toolbar-items>
            </v-app-bar>

            <v-content>
                <router-view/>
            </v-content>

        </v-app>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {

        }
    }
</script>

<style>
    #app {
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        /*text-align: center;*/
        /*color: #2c3e50;*/
        /*margin-top: 60px;*/
    }
</style>
