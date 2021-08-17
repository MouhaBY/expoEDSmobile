//ACTION TYPES
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = { authenticated:false, userData:{} };

function authReducer(state=initialState, action){
    let nextState;
    switch (action.type){
        case LOGIN:
            nextState = {
                ...state,
                authenticated:true,
                userData:action.value,
            }
            return nextState;
        case LOGOUT:
            nextState = {
                ...state,
                authenticated:false,
                userData:{},
            }
            return nextState || state;
        default:
            return state
    }
}

export default authReducer
