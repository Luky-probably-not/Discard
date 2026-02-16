const apiUrl = import.meta.env.VITE_API_URL as string

const getUserByNameUrl = apiUrl + "/protected/user/meta";

const getMultipleUserByNameUrl = (users : string[]) : string => {
    const params = users.join(",");
    return `${getUserByNameUrl}?users=${params}`
}

const getOneUserByNameUrl = (user : string) : string => {
    return `${getUserByNameUrl}?users=${user}`
};

export {  
    getMultipleUserByNameUrl, 
    getOneUserByNameUrl,
}