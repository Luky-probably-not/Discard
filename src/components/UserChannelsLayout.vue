<script setup lang="ts">
    import AddChannel from '@/components/channels/AddChannel.vue';
    import Channelitem from '@/components/channels/Channelitem.vue';
    import UserProfile from '@/components/users/UserProfile.vue';

    import {GetChannelByUser,channels} from "@/api/channel"

    import {onMounted} from "vue"

    onMounted(async () => {
        channels.value = await GetChannelByUser()
    })

</script>
<template>
    <AddChannel />
    <div v-for="channel in channels" :key="channel.id">
        <Channelitem :channel="channel" />
    </div>
    <UserProfile />

</template>
<style scoped>
</style>
