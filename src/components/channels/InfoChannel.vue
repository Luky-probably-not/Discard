<script setup lang="ts">
    import {GetChannelByID} from "@/ts/channels"

    import { ref,watch, type Ref } from "vue"
    type ChannelPromise = {
        id: number,
        name:string,
        img:string,
        users:string[],
        theme:string
    }
    const channelID = ref<number | null>(null)
    const infoChannel: Ref<ChannelPromise | null> = ref(null)

    watch(channelID, async (newID) => {
        if (newID !== null) {
            infoChannel.value = await GetChannelByID(newID)
        }
    })
</script>
<template>
    <form @submit.prevent>
        <input type="number" v-model.number="channelID" placeholder="Entrez un ID" />
    </form>

    <div v-if="infoChannel">
        <h2>Détails du channel :</h2>
        <p>{{infoChannel.id}} </p>
        <p>{{ infoChannel.name }}</p>
        <img :src="infoChannel.img" alt="channel picture" />
        <p>Users : {{ infoChannel.users.join(", ") }}</p>
        <p>{{infoChannel.theme}} </p>
    </div>
</template>
<style scoped>
</style>