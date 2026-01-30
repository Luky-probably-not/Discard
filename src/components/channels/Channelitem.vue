<script setup lang="ts">
    import {type ChannelPromise} from "@/ts/channels"

    defineProps<{channel: ChannelPromise}>()
</script>

<template>
    <p>{{ channel.name }}</p>
    <img :src="channel.img" alt="channel picture" />
</template>