import { type ChannelElement} from "@/ts/domain/channel"
import { ref, type Ref } from "vue"
const api_url = import.meta.env.VITE_API_URL as string

const GetChannelByUser = async (token : string) => {
    const request = await fetch(api_url+"/protected/user/channels",{
        method : "GET",
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    const response = await request.json()
    return response
}

const GetChannelByID = async (token : string, id: number) => {
  const channels = await GetChannelByUser(token)
  return channels.find((c: any) => c.id === id)
}

const AddChannel = async (token : string, name: string, img: string) => {
    const request = await fetch(api_url+"/protected/channel",{
        method : "POST",
        body:JSON.stringify({
            "name" : name,
            "img" : img
        }),
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-Type": "application/json"
        },
    })
    const response = await request.json()
    const newChannel: ChannelElement = {
        id: response,
        name: name,
        img: img,    
    }
    channels.value.push(newChannel)
    selectedChannelID.value = response
    return response
}

const selectedChannelID = ref<number | null>(null)
const PrintPopUpChannel = ref(false)
const channels: Ref<ChannelElement[]> = ref([])

export {
    channels,
    selectedChannelID,
    PrintPopUpChannel,
    GetChannelByUser,
    GetChannelByID,
    AddChannel
}
