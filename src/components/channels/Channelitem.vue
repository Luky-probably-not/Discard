<script setup lang="ts">
    type ChannelPromise = {
    id: number
    name: string
    img: string
    }

    defineProps<{
    channel: ChannelPromise
    }>()
</script>

<template>
    <p>{{ channel.name }}</p>
    <img :src="channel.img" alt="channel picture" />
</template>