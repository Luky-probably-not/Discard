<script setup lang="ts">
import InfoChannel from '@/components/channels/InfoChannel.vue';
import AddUser from '@/components/users/AddUser.vue';
import PopUpEditChannel from './channels/PopUpEditChannel.vue';
import { selectedChannelID } from '@/ts/channel';

const props = defineProps({
    token : String,
})

</script>
<template>
    <AddUser 
        v-if="props.token != ''"
        :token-jwt="props.token"
        :channelId?="selectedChannelID"
    />
    <PopUpEditChannel
        v-if="props.token != ''"
        :token-jwt="props.token"
        :channel-id?="selectedChannelID"
    />
    <InfoChannel
        v-if="props.token != ''"
        :token-jwt="props.token"
        :channel-id?="selectedChannelID"
    />
</template>
<style scoped>
</style>