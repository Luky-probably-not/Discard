<script setup lang="ts">
    import {getOneUserByName} from '@/ts/users';
    import { connectedUser } from '@/ts/connectedUser';
    import { showProfile, UpdateUser } from '@/ts/users';
    import { User } from '@/ts/domain/user';
    import { ref, onMounted } from "vue"

   const props = defineProps({
        token : String,
        store : connectedUser
    })
    let userInfo = ref<User>({
        username: '',
        display_name: '',
        img: '',
        status: ''
    })
    onMounted(async () => {
        userInfo.value = await getOneUserByName(props.token!, props.store!.userName)
    })
    
</script>
<template>
    <button @click="showProfile = !showProfile">+</button>
    <form @submit.prevent="UpdateUser(props.token!, userInfo)">
        <input v-model="userInfo.display_name" />
        <p>{{ userInfo.username }}</p>
        <img :src="userInfo.img" alt="user picture" />
        <input v-model="userInfo.img" />
        <input v-model="userInfo.status" />
        <button type="submit">Update</button>

    </form>
</template>
<style scoped>
</style>