<template>
    <div>
        <v-simple-table :height="200" v-if="logs.length !== 0">
            <template v-slot:default>
                <tbody>
                <tr v-for="(item, index) in logs" v-bind:key="index">
                    <td>{{ item.message }}</td>
                    <td width="220px" style="text-align: right;">{{ new Date(item.time * 1000).toLocaleString() }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div style="height: 200px;" v-else>
            {{$t('log.no_data')}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "LiveLog",
        data: () => ({
            logs: [],
            stream: null,
        }),
        mounted() {
            this.getStream()
        },

        beforeDestroy() {
            console.log(1111)
            this.stream.close()
        },

        methods: {
            getStream() {
                this.stream = new EventSource(this.utils.baseURL + '/livelog')
                this.stream.onmessage = (event) => {
                    let data = JSON.parse(event.data)
                    switch (data['Type']) {
                        case 'submit_flag':
                            this.push({
                                time: data['Time'],
                                message: this.$t('log.submit_flag', {
                                    'from': data['Message']['From'],
                                    'to': data['Message']['To'],
                                    'challenge': data['Message']['Challenge'],
                                })
                            })
                            break;
                        case 'check_down':
                            this.push({
                                time: data['Time'],
                                message: this.$t('log.check_down', {
                                    'team': data['Message']['Team'],
                                    'challenge': data['Message']['Challenge'],
                                })
                            })
                            break;
                    }
                };
                this.stream.onerror = function (err) {
                    console.log(err)
                };
            },
            push(data) {
                if (this.logs.length > 30) {
                    this.logs = this.logs.slice(0, 30)
                }
                this.logs.unshift(data)
            }
        }
    }
</script>

<style scoped>

</style>