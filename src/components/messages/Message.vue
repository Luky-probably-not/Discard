<script>
import MessageBody from '@messages/MessageBody.vue';
import MessageHeader from '@messages/MessageHeader.vue';
export default {
    name: "Message",
    components: {
        MessageHeader,
        MessageBody
    }
};
</script>
<template>
    <p>Message Component</p>
    <MessageHeader />
    <MessageBody />
</template>