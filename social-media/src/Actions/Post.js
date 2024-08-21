export const likepost=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:"likeRequest"
        })
        const {data}=await axios.get(`/user/${id}`);
        dispatch({
            type:"likeSuccess",
            payload:data.users
        })
    }
    catch(err){
        dispatch({
            type:"likeFailure",
            payload:err
        })
    }
}
export const addCommentonPost=(id,comment)=>async(dispatch)=>{
    try{
        dispatch({
            type:"commentRequest"
        })
        
        const { data } = await axios.put(
            `/post/comment/${id}`,
            {
              comment,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        )
        dispatch({
            type:"commentSuccess",
            payload:data.message
        })
        
    }
    catch(err){
        dispatch({
            type:"commentFailure",
            payload:err.response.data.message
        })
    }
}
export const deleteCommentOnPost=(id,commentId)=>async(dispatch)=>{
    try{
        dispatch({
            type:"deleteCommentRequest"
        })
        const {data}=await axios.delete(`/post/deleteComment/${id}`,{
            data:commentId
        })
        dispatch({
            type:"deleteCommentSuccess",
            payload:data.message
        })
    }
    catch (error) {
        dispatch({
          type: "deleteCommentFailure",
          payload: error.response.data.message,
        });
      }
}
export const createNewPost = (caption, image) => async (dispatch) => {
    try {
      dispatch({
        type: "newPostRequest",
      });
  
      const { data } = await axios.post(
        `/post/upload`,
        {
          caption,
          image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "newPostSuccess",
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: "newPostFailure",
        payload: error.response.data.message,
      });
    }
  };
export const  updatePost=(caption,id)=>async(dispatch)=>{
    try{
        dispatch({
            type:"updateCaptionRequest"
        })
        const {data}=await axios.put(`/post/${id}`,{
            caption
        },
        {
            headers:{
                "Content-Type":"application/json"
            }
        })
        dispatch({
            type:"updateCaptionSuccess",
            payload:data.message
        })
    }
    catch(err){
        dispatch({
            type:"updateCaptionFailure",
            payload:err.response.data.message
        })
    }

}
export const deletePost=(id)=>async(dispatch)=>{
    try{
        dispatch({
            type:"deletePostRequest"
        })
        const {data}=await axios.delete(`/post/${id}`)
        dispatch({
            type:"deletePostSuccess",
            payload:data.message
        })
    }
    catch(err){
        dispatch({
            type:"deletePostFailure",
            payload:err.response.data.message
        })
    }
}