import {store} from 'reduxjs/toolkit';
import UserReducer, { alluserReducer, postofFollowingreducer,likeReducer,myPostsReducer,
    userProfileReducer,userPostsReducer
 } from './reducers/User';
const store=configureStore({
    reducer:{
        user:UserReducer,
        postoffollowing:postofFollowingreducer,
        alluser:alluserReducer,
        like: likeReducer,
        myPosts: myPostsReducer,
        userProfile: userProfileReducer,
        userPosts: userPostsReducer,
        
    }
})
export default store
