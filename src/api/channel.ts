import type  { ChannelInfo } from "@/types"
import { getApiUrl, getAuthHeaders } from "@/api/apiHandler";
import { ref, type Ref } from "vue";

const GetChannelByUser = async () : Promise<ChannelInfo[]> => {
    const response = await fetch(getApiUrl(`/protected/user/channels`),{
        method : "GET",
        headers : getAuthHeaders(),
    })
    if (!response.ok) {
        console.error("Error creating message:", response.status);
    }
    return await response.json()
}

const GetChannelByID = async (id: number) : Promise<ChannelInfo>=> {
    const channels = await GetChannelByUser()
    const channel = channels.find(c => c.id === id);

    if (!channel) {
        throw new Error(`Channel ${id} not found`);
    }

    return channel;
}

const UpdateChannel = async (channelId : number, newChannel : ChannelInfo) => {
    const response = await fetch(getApiUrl(`/protected/channel/${channelId}/update_metadata`),{
        method: "PUT",
        body: JSON.stringify(newChannel),
        headers : getAuthHeaders(),
    })
    if (!response.ok) {
        console.error("Error creating message:", response.status);
    }
    return;
}


const PostChannel = async (name: string, img: string) => {
    const request = await fetch(getApiUrl(`/protected/channel`),{
        method : "POST",
        headers : getAuthHeaders(),
        body:JSON.stringify({
            "name" : name,
            "img" : img
        }),
    })
    const response = await request.json()
    const newChannel: ChannelInfo = {
        id: response,
        name: name,
        img: img,
        creator: "",
        theme: {
            primary_color: "",
            primary_color_dark: "",
            accent_color: "",
            text_color: "",
            accent_text_color: ""
        },
        users: []
    }
    channels.value.push(newChannel)
    selectedChannelID.value = response
    return
}

const selectedChannelID = ref<number>(0)
const PrintPopUpChannel = ref(false)
const channels: Ref<ChannelInfo[]> = ref([])

export {
    GetChannelByID,
    GetChannelByUser,
    UpdateChannel,
    PostChannel,
    channels,
    selectedChannelID,
    PrintPopUpChannel,

}
