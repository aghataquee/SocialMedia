export const registerUser =
  (name, email, password, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "RegisterRequest",
      });

      const { data } = await axios.post(
        "/user/register",
        { name, email, password, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: "RegisterSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "RegisterFailure",
        payload: error.response.data.message,
      });
    }
  };
export const Login_user=(email,password)=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoginRequest"
        })
        const {data}=axios.post('/user/Login',(email,password),{
            Header:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })

        
    } catch (error) {
        dispatch({
            type:"LoginFailure",
            payload:error
        })
        
    }
        
}
export const Load_user=()=>async(dispatch)=>{
    try {
        dispatch({
            type:"LoadRequest"
        })
        const user= await axios.get('/user/me')
        dispatch({
            type:"LoadSuccess",
            payload:user
        })
        
    } catch (error) {
        dispatch({
            type:"LoaduserFailure",
            payload:error
        })
    }
        
    
}
export const getMyPosts = () => async (dispatch) => {
    try {
      dispatch({
        type: "myPostsRequest",
      });
  
      const { data } = await axios.get("/api/v1/my/posts");
      dispatch({
        type: "myPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "myPostsFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const logoutUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LogoutUserRequest",
      });
  
      await axios.get("/api/v1/logout");
  
      dispatch({
        type: "LogoutUserSuccess",
      });
    } catch (error) {
      dispatch({
        type: "LogoutUserFailure",
        payload: error.response.data.message,
      });
    }
  };
export const getfollowingPosts=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"postoffollowingRequest"
        })
        const {data}=await axios.get('/user/posts');
        dispatch({
            type:"postoffollowingSuccess",
            payload:data.posts
        })
    }
    catch(err){
        dispatch({
            type:"postoffollowingFailure",
            payload:error.response.data.message
        })

    }

}
export const getAllusers=(name="")=>async(dispatch)=>{
    try{
        dispatch({
            type:"alluserRequest"
        })
        const { data } = await axios.get(`/api/v1/users?name=${name}`);
        
        dispatch({
            type:"alluserSuccess",
            payload:data.users
        })
    }
    catch(err){
        dispatch({
            type:"alluserFailure",
            payload:error.response.data.message
        })
    }
}
export const updateProfile = (name, email, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: "updateProfileRequest",
      });
  
      const { data } = await axios.put(
        "/api/v1/update/profile",
        { name, email, avatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "updateProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "updateProfileFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const updatePassword =
    (oldPassword, newPassword) => async (dispatch) => {
      try {
        dispatch({
          type: "updatePasswordRequest",
        });
  
        const { data } = await axios.put(
          "/api/v1/update/password",
          { oldPassword, newPassword },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        dispatch({
          type: "updatePasswordSuccess",
          payload: data.message,
        });
      } catch (error) {
        dispatch({
          type: "updatePasswordFailure",
          payload: error.response.data.message,
        });
      }
    };
  
  export const deleteMyProfile = () => async (dispatch) => {
    try {
      dispatch({
        type: "deleteProfileRequest",
      });
  
      const { data } = await axios.delete("/api/v1/delete/me");
  
      dispatch({
        type: "deleteProfileSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "deleteProfileFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const forgotPassword = (email) => async (dispatch) => {
    try {
      dispatch({
        type: "forgotPasswordRequest",
      });
  
      const { data } = await axios.post(
        "/api/v1/forgot/password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "forgotPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "forgotPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const resetPassword = (token, password) => async (dispatch) => {
    try {
      dispatch({
        type: "resetPasswordRequest",
      });
  
      const { data } = await axios.put(
        `/api/v1/password/reset/${token}`,
        {
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      dispatch({
        type: "resetPasswordSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "resetPasswordFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const getUserPosts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userPostsRequest",
      });
  
      const { data } = await axios.get(`/api/v1/userposts/${id}`);
      dispatch({
        type: "userPostsSuccess",
        payload: data.posts,
      });
    } catch (error) {
      dispatch({
        type: "userPostsFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const getUserProfile = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "userProfileRequest",
      });
  
      const { data } = await axios.get(`/api/v1/user/${id}`);
      dispatch({
        type: "userProfileSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "userProfileFailure",
        payload: error.response.data.message,
      });
    }
  };
  
  export const followAndUnfollowUser = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "followUserRequest",
      });
  
      const { data } = await axios.get(`/api/v1/follow/${id}`);
      dispatch({
        type: "followUserSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "followUserFailure",
        payload: error.response.data.message,
      });
    }
  };
