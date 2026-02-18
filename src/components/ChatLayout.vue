<script setup lang="ts">
import MessageList from '@/components/messages/MessageList.vue';
import MessageInput from '@/components/messages/MessageInput.vue';
</script>
<template class="middle-panel">
    <MessageList class="top shadow" />
    <MessageInput class="bottom shadow"/>
</template>
<style scoped>
.middle-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
}

.top {
  flex: 1;
  overflow-y: auto;
}

.bottom {
  flex-shrink: 0;
}
.top::-webkit-scrollbar {
  width: 6px;
}

.top::-webkit-scrollbar-thumb {
  border-radius: 4px;
}
</style>
