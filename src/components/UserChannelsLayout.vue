<script setup lang="ts">
    import AddChannel from '@/components/channels/AddChannel.vue';
    import ChannelList from '@/components/channels/ChannelList.vue';
    import UserProfile from '@/components/users/UserProfile.vue';

</script>

<template>
    <section class="left-panel">
        <section class="channels window shadow">
          <AddChannel class="top"/>
          <ChannelList class="middle"/>
        </section>
        <section class="window shadow">
          <UserProfile class="bottom"/>
        </section>
    </section>
</template>

<style scoped>
.left-panel {
  display: flex;
  flex-direction: column;
  height: 100%; 
  gap: 15px;
}

.channels {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.top {
  flex-shrink: 0;
}

.middle {
  flex: 1;
  overflow-y: auto;
  min-height: 75vh;
  max-height: 75vh;
}

.bottom {
  flex-shrink: 0;
}
.middle::-webkit-scrollbar {
  width: 6px;
}

.middle::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
}

.shadow {
  box-shadow: var(--box-shadow-intern);
  }
</style>
