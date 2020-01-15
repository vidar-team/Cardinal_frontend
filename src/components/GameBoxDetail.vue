<template>
    <!-- 靶机详细信息 -->
    <v-dialog width="500">
        <v-card>
            <v-card-title class="headline" primary-title>
                {{questionDetail.Title}}
            </v-card-title>
            <v-card-text>
                <p><b>{{questionDetail.TargetIP}}:{{questionDetail.TargetPort}}</b></p>
                <v-textarea filled auto-grow rows="4" shaped :disabled="true" v-model="questionDetail.Describe"></v-textarea>
            </v-card-text>
            <v-divider/>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" text @click="showQuestionDetail = false">
                    关闭
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "GameBox"
    }
</script>

<style scoped>

</style>