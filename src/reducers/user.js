const initState = {
    userInfo: {
        avatar: '',
        firstname: '',
        lastname: '',
    }
}

const UserReducer = (state=initState, action)=>{
    switch(action.type){
        case 'SET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload
            }
        case 'SET_SAVED_SEARCHES':
            return {
                ...state,
                savedSearches: action.payload
            }
        default:
            return state
    }
}

export default UserReducer