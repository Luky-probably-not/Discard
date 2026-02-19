<script setup lang="ts">
import { useStore } from '@/store';
import UserInfo from '../users/UserInfo.vue';

defineProps({
    isCreator: Boolean
})

const store = useStore();

</script>
<template>
    <section class="headbar"></section>
    <section class="users-list">
        <article v-for="user in store.currentChannel!.users" :key="user">
            <UserInfo :is-creator="isCreator" :user-name="user"/>
        </article>
    </section>
</template>
<style scoped>
.users-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 87%;
    padding: 10px;
    overflow-y: auto;
}

.users-list::-webkit-scrollbar {
    width: 6px;
}

.users-list::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.2);
    border-radius: 4px;
}

.headbar {
    flex-shrink: 0;
    height: 20px;
}

</style>
