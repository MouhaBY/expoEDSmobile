import store from '../Redux/configureStore';


const API_TOKEN = "MBY";

function getAddress(){
    let state = store.getState();
    let serverAddress = state.configReducer.serverAddress;
    return serverAddress;
}

export async function loginAPI(username, password) {
    let serverAddress = getAddress();
    return new Promise(async (resolve, reject) => {
        try{
            const response = await fetch('http://'+serverAddress+'/users/login' + '?api_key=' + API_TOKEN, {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({username:username, password:password}),
            })
            if (response.ok) {
                const results = await response.json() 
                resolve (results)
            }
            else {
                const error = await response.json() 
                reject(error)
            }
        }
        catch(error){
            reject(error)
        }
    })
}
