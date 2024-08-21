import {createReducer} from 'react-redux';
const initialStore={};
const UserReducer=createReducer({initialStore,
    RegisterRequest:(state)=>{
        state.loading=true;
    },
    RegisterSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;

    },
    RegisterFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    LoginRequest:(state)=>{
        state.loading=true;
    },
    LoginSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;

    },
    LoginFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    UserLoadRequest:(state)=>{
        state.loading=true;
    },
    UserLoadSuccess:(state,action)=>{
        state.loading=false;
        state.user=action.payload;

    },
    UserLoadFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    },
    LogoutUserRequest: (state) => {
        state.loading = true;
    },
    LogoutUserSuccess: (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
    },
    LogoutUserFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = true;
    },
    
})
export default UserReducer;
export const postofFollowingreducer=createReducer({initialStore,
    postoffollowingRequest:(state)=>{
        state.loading=true;
    },
    postoffollowingSuccess:(state,action)=>{
        state.loading=false;
        state.posts=action.payload;
    },
    postoffollowingFailure:(state)=>{
        state.loading=false;
    },
    clearerrors:(state)=>{
        state.error=null
    }
})
export const alluserReducer=createReducer({initialStore,
    alluserRequest:(state)=>{
        state.loading=true
    },
    alluserSuccess:(state,action)=>{
        state.loading=false;
        state.users=action.payload;
    },
    alluserFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    }

})
export const userProfileReducer = createReducer(initialState, {
    userProfileRequest: (state) => {
      state.loading = true;
    },
    userProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    userProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  });
