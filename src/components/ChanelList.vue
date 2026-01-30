<script setup lang="ts">
    import AddChannel from '@/components/channels/AddChannel.vue';
    import Channel from '@/components/channels/Channelitem.vue';
    import {GetChannelByUser,type ChannelPromise} from "@/ts/channels"

    import { ref, onMounted, type Ref } from "vue"

    const channels: Ref<ChannelPromise[]> = ref([])

    onMounted(async () => {
        channels.value = await GetChannelByUser()
    })

</script>
<template>
    <AddChannel />
    <div v-for="channel in channels" :key="channel.id">
        <Channel :channel="channel" />
    </div>

    
</template>
<style scoped>
</style>