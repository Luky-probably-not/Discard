const api_url = import.meta.env.VITE_API_URL as string

const token = "eyJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6ImZhbHNlIiwiaWF0IjoiMTc2OTc3ODE1OCIsInN1YiI6ImMuam9seSJ9.oD2Rq2yImbih8BW7JL07hFIA36KgD9QeVDRaaSGWecs"

const GetChannelByUser = async () => {
    const request = await fetch(api_url+"/protected/user/channels",{
        method : "GET",
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    const response = await request.json()
    return response
}

const GetChannelByID = async (id: number) => {
  const channels = await GetChannelByUser()
  return channels.find((c: any) => c.id === id)
}

export {
    GetChannelByUser,
    GetChannelByID
}

