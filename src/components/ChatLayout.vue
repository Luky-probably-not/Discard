<script setup lang="ts">
import MessageList from '@/components/messages/MessageList.vue';
import MessageInput from '@/components/messages/MessageInput.vue';
</script>
<template >
    <section class="middle-panel">
        <MessageList class="top window shadow" />
        <MessageInput class="bottom window shadow"/>
    </section>
</template>
<style scoped>
.middle-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
}

.top {
  flex-shrink: 0;
  padding-bottom: 15px;
}

.bottom {
  flex-shrink: 0;
}

</style>
