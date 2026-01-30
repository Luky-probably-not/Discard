<script>
import User from '@users/User.vue';
import AddUser from '@users/AddUser.vue';
import InfoChannel from '@channels/InfoChannel.vue';
export default {
    name: "UserList",
    components: {
        User,
        AddUser,
        InfoChannel
    }
};
</script>
<template>
    <p>User List Component</p>
    <User />
    <AddUser />
    <InfoChannel />
</template>