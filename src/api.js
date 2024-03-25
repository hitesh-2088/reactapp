export const url = "http://localhost:5000/"
export const addUser = (inputs, endpoint)=>{
    let returnmessage = ""
    let method = 'POST'
    if (endpoint !== 'users') {
         method = 'PUT'
    }
    try {
        fetch(url+endpoint, {
        method:method,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(inputs)
        })
        .then(res => returnmessage ="Customer added successfully !")
        .catch(error => {
            returnmessage = "Customer added failed successfully !"
        });
    } catch{
        returnmessage = "Api endpoint is down!!!"
    }
    return returnmessage 
}

export const fetuser = (uid, endpoint)=>{

    try {
        return fetch(url+endpoint+"/"+uid, {
        method: 'GET',
        headers: {'Content-Type':'application/json'},
        })
        .then((response) => response.json())
        .then(res => { return res["data"][0]} )
        .catch(error => {
            return {}
        });
    } catch{
        return {}
    }
}

// export const  getAlluserdata = async()=>{
//     let userdata = {}
//     try {
//         await fetch(url+"users", {
//         method: 'GET',
//         headers: {'Content-Type':'application/json'},
//         })
//         .then((response) => response.json())
//         .then((result) => userdata = result["data"])
//         .catch(error => {
//             return userdata = {}
//         });
//     } catch{
//         return userdata = {}
//     }
    
// };