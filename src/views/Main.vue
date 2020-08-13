<template>
    <v-container>
        <!-- 时间 -->
        <v-card class="mx-auto" max-width="600" color="transparent" flat>
            <Timer/>
        </v-card>

        <v-row>
            <v-col cols="6" md="4">
                <!-- 靶机信息 -->
                <Info/>
                <copyrights/>
            </v-col>
            <v-col cols="12" md="8">
                <v-card class="mx-auto">
                    <v-card-title>{{$t('log.live_log')}}</v-card-title>
                    <v-card-text>
                        <LiveLog/>
                    </v-card-text>
                </v-card>
                <br>
                <SubmitFlag/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Timer from "../components/Timer";
    import Info from "../components/Info";
    import SubmitFlag from "../components/SubmitFlag";
    import LiveLog from "../components/LiveLog";
    import Copyrights from "../components/Copyrights";

    export default {
        name: "Main",
        components: {Copyrights, LiveLog, SubmitFlag, Info, Timer}
    }
</script>

<style scoped>

</style>