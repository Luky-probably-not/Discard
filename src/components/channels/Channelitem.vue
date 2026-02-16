<script setup lang="ts">
    import {selectedChannelID} from "@/ts/channel"
    import { type Channel } from "@/ts/domain/channel"

    defineProps<{channel: Channel}>()
</script>

<template>
    <div class="channel-item" @click="selectedChannelID = channel.id">
        <p>{{ channel.name }}</p>
        <img :src="channel.img" alt="channel picture" />
    </div>
</template>