<script>
import MessageBar from '@components/MessageBar.vue';
import ChanelList from '@components/ChanelList.vue';
import UserList from '@components/UserList.vue';
import MessageList from '@components/MessageList.vue';
export default {
    name: "ChatPage",
    components: {
    MessageBar,
    ChanelList,
    UserList,
    MessageList
  }
};
</script>
<template>
    <p>Chat Page</p>
    <ChanelList />
    <MessageList />
    <MessageBar />
    <UserList />

</template>