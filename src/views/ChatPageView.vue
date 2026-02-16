<script setup lang="ts">
    import ChannelList from '@/components/ChannelList.vue';
    import UserList from '@/components/UserList.vue';
    import { selectedChannelID } from '@/ts/channel';
    import { connectedUser } from '@/ts/connectedUser';
    const props = defineProps({
        token : String,
        store : connectedUser
    })
</script>
<template>
    <ChannelList />
    <UserList v-if="selectedChannelID !== 0" :token="props.token" />
</template>
<style scoped>
</style>