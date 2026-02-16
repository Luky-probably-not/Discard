<script setup lang="ts">
    import AddChannel from '@/components/channels/AddChannel.vue';
    import Channelitem from '@/components/channels/Channelitem.vue';
    
    import {GetChannelByUser,} from "@/ts/channel"

    import { connectedUser } from "@/ts/connectedUser"
    import { type Channel } from "@/ts/domain/channel"

    import { ref, onMounted, type Ref } from "vue"

    const channels: Ref<Channel[]> = ref([])
    const user = connectedUser()

    onMounted(async () => {
        channels.value = await GetChannelByUser(user.tokenJwt)
    })

</script>
<template>
    <AddChannel />
    <div v-for="channel in channels" :key="channel.id">
        <Channelitem :channel="channel" />
    </div>

    
</template>
<style scoped>
</style>