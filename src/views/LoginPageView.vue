<script setup lang="ts">
    import LoginBloc from '@/components/LoginBloc.vue';
    import { connectedUser } from '@/ts/connectedUser';
    const props = defineProps({
        token : String,
        store : connectedUser
    })
</script>
<template>
    <LoginBloc />
</template>
<style scoped>
</style>