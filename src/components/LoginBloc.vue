<script setup lang="ts">
    import LoginUser from './users/LoginUser.vue';
    import { connectedUser } from '@/ts/connectedUser';
    const props = defineProps({
        token : String,
        store : connectedUser
    })
</script>
<template>
    <LoginUser :store="props.store" :token="props.token" />
</template>
<style scoped>
</style>