<script>
import AddChannel from '@channels/AddChannel.vue';
import Channels from '@channels/Channels.vue';
export default {
    name: "ChannelList",
    components: {
        AddChannel,
        Channels
    }
};
</script>
<template>
    <p>Channel List Component</p>
    <AddChannel />
    <Channels />
</template>