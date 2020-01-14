<template>
    <div id="app">
        <v-app>
            <v-app-bar
                    app
                    clipped-left
                    color="transparent"
            >
                <v-toolbar-title>

                </v-toolbar-title>
            </v-app-bar>

            <v-content>
                <router-view></router-view>
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
