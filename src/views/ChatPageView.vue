<script setup lang="ts">
    import UserChannelsLayout from '@/components/UserChannelsLayout.vue';
    import ChannelInfoLayout from '@/components/ChannelInfoLayout.vue';
    import ChatLayout from '@/components/ChatLayout.vue';
    import { selectedChannelID } from '@/api/channel';
</script>
<template>
    <UserChannelsLayout />
    <ChatLayout />
    <ChannelInfoLayout v-if="selectedChannelID !== 0" />
</template>
<style scoped>
</style>
