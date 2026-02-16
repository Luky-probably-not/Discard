<script setup lang="ts">
    import PopUpUserProfile from '@/components/users/PopUpUserProfile.vue';
    import { connectedUser } from '@/ts/connectedUser';
    import { showProfile } from '@/ts/users';
    const props = defineProps({
        token : String,
        store : connectedUser
    })
</script>
<template>
    <button @click="showProfile = !showProfile">+</button>
    <PopUpUserProfile v-if="showProfile" :token="props.token" :store="props.store" />
</template>
<style scoped>
</style>