<template>
    <v-container>
        <!-- 时间 -->
        <v-card class="mx-auto" max-width="600" color="transparent" flat>
            <Timer/>
        </v-card>
    </v-container>
</template>

<script>
    import Timer from "../components/Timer";

    export default {
        name: "Main",
        components: {Timer}
    }
</script>

<style scoped>

</style>