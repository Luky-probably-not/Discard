import { ref } from "vue";
import type { User } from "./domain/user";
import { getMultipleUserByNameUrl, getOneUserByNameUrl } from "./domain/UsefulURL";

const api_url = import.meta.env.VITE_API_URL as string

const login = async (username : string, password : string) : Promise<string> => {
    var request = await fetch(api_url + "/login", {
        method: "POST",
        body: JSON.stringify({
            "username" : username,
            "password" : password
        }),
        headers : { 
            "Content-type" : "application/json"
        }
    })
    var response = await request.json()
    return response.token
}

const addUserToChannel = async (token : string, username : string, idChannel : number ) => {
    var request = await fetch(api_url + `/protected/channel/${idChannel}/user/${username}`, {
        method: "PUT",
        headers : {
            "Authorization" : "Bearer " + token
        }
    })
    var response = await request.status
    return;
}

const getOneUserByName = async (token : string, user : string) : Promise<User> => {
    var request = await fetch(getOneUserByNameUrl(user), {
        method: "GET",
        headers :{
            "Authorization" : "Bearer " + token
        }
    });
    var response : User[] = await request.json();
    return response[0]!;
}

const getMultipleUserByName = async (token : string, users : string[]) : Promise<User[]> => {
    var request = await fetch(getMultipleUserByNameUrl(users), {
        method: "GET",
        headers :{
            "Authorization" : "Bearer " + token
        }
    });
    var response : User[] = await request.json();
    return response;
}

const UpdateUser = async (token : string, user : User) => {
    const request = await fetch(api_url+"/protected/user/meta", {
        method: "POST",
        body: JSON.stringify(user),
        headers : {
            "Authorization" : "Bearer " + token,
            "Content-type" : "application/json"
        }
    })
    console.log(token)
    return;
}

const showProfile = ref(false);

export { 
    addUserToChannel, 
    getMultipleUserByName, 
    getOneUserByName, 
    login,
    UpdateUser,
    showProfile
};

