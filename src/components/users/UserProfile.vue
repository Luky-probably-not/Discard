<script setup lang="ts">
    import PopUpUserProfile from '@/components/users/PopUpUserProfile.vue';
    import { showProfile } from '@/api/user';
</script>
<template>
    <button @click="showProfile = !showProfile">+</button>
    <PopUpUserProfile v-if="showProfile" />
</template>
<style scoped>
</style>
