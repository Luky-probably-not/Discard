<script setup lang="ts">
    import AddChannel from '@/components/channels/AddChannel.vue';
    import Channelitem from '@/components/channels/Channelitem.vue';
    import UserProfile from './users/UserProfile.vue';
    
    import {GetChannelByUser,channels} from "@/ts/channel"

    import { connectedUser } from "@/ts/connectedUser"

    import {onMounted} from "vue"

    const props = defineProps({
        token : String,
        store : connectedUser
    })

    onMounted(async () => {
        channels.value = await GetChannelByUser(props.token!)
    })

</script>
<template>
    <AddChannel />
    <div v-for="channel in channels" :key="channel.id">
        <Channelitem :channel="channel" />
    </div>
    <UserProfile :token="props.token" :store="props.store"/>
    
</template>
<style scoped>
</style>