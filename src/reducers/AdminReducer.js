const adminReducer = (
    state = {usersShow: false, postShow: false},
    action
)=>{
    switch(action.type) {

        case "USERS_SELECTED" :
            return {...state, usersShow: true,postShow:false};
        case "POSTS_SELECTED" :
            return {...state, postShow: true, usersShow:false};
            case "DASHBOARD_SELECTED" :
                return {...state, postShow: false, usersShow:false};
            default:
                return state;
        
    }
};

export default adminReducer;


//pari work akuo