<script setup lang="ts">
import PopUpChannel from '@/components/channels/PopUpChannel.vue';
import { PrintPopUpChannel } from '@/ts/channel';
const props = defineProps({
        token : String
    })
</script>
<template>
    <button @click="PrintPopUpChannel = !PrintPopUpChannel">+</button>
    <PopUpChannel v-if="PrintPopUpChannel" :token="props.token" />
</template>
<style scoped>
</style>