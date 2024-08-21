import { Favorite,FavoriteBorder,ChatBubbleOutline, DeleteOutline, } from "@mui/icons-material";
import { Avatar, Typography } from "@mui/material";
import React from 'react';
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux'
import {
    addCommentOnPost,
    deletePost,
    likePost,
    updatePost,
  } from "../../Actions/Post";
  import { getFollowingPosts, getMyPosts, loadUser } from "../../Actions/User";
  import User from "../User/User";
  import CommentCard from "../CommentCard/CommentCard";

function Post({
    postImage,
    caption,
    postId,
    likes=[],
    comments=[],
    ownerImage,
    ownerName,
    ownerId,
    isDelete=false,
    isAccount=false
}){
    const dispatch=useDispatch();
    const [liked,setlike]=useState(false);
    const [commentToggle,setCommenttoggle]=useState(false);
    const [commentValue,setCommentValue]=useState('');
    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);

    const handlelike=async()=>{
        setlike(!liked);
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(getMyPosts());
          } else {
            dispatch(getFollowingPosts());
          }
    };
    
    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));
    
        if (isAccount) {
          dispatch(getMyPosts());
        } else {
          dispatch(getFollowingPosts());
        }
      };
      const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue, postId));
        dispatch(getMyPosts());
      };
      const deletePostHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
      };
    

    return(
        <div className="post">
            <div className="Header">
                {
                    isAccount?<button>
                        <Merver/>
                    </button>:null
                }
            </div>
            <img src={postImage} alt=""/>
            <div className="post-details">
                <Avatar src={ownerImage} alt="user" sx={{
                    height:"3vmax",
                    width:"3vmax"}}/>
                <Link to={`/user/${ownerId}`}>
                    <Typography>{ownerName}</Typography>
                </Link>
                <Typography>
                    {caption}
                </Typography>

            </div>
            <button
        style={{
          border: "none",
          backgroundColor: "white",
          cursor: "pointer",
          margin: "1vmax 2vmax",
        }}
        onClick={() => setLikesUser(!likesUser)}
        disabled={likes.length === 0 ? true : false}
      >
        <Typography>{likes.length} Likes</Typography>
      </button>
            <div className="postFooter">
                <button onClick={handlelike}>
                    {liked?<Favorite style={{color:"red"}}/>:<FavoriteBorder/>}
                </button>
                <button onClick={()=>setCommenttoggle(!commentToggle)}>
                    <ChatBubbleOutline/>
                </button>
                {
                    isDelete?<button onClick={deletePostHandler}>
                        <DeleteOutline/>
                    </button>:null
                }

            </div>
            <Dialog open={likesUser} close={()=>setlikesuser(!likesUser)}>
                <div className="Dialogbox">
                    <Typography variant="h4">Liked By</Typography>
                    {
                        likes.map((like)=>{
                            <User key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}/>
                        })
                    }

                </div>
            </Dialog>
            <Dialog open={commentToggle} close={()=>setCommenttoggle(!commentToggle)}>
                <div>
                    <Typography variant="h4">Comments</Typography>
                    <form className="CommentForm" onSubmit={addCommentHandler}>
                        <input type="text" placeholder="Add Comment"
                        onChange={(e)=>setCommentValue(e.target.value)}/>
                        <button type="submit" variant="contained">Add</button>
                    </form>
                    {
                comments.length()>0?(
                    comments.map((item)=>{
                        <CommentCard
                        userId={item.user._id}
                        name={item.user.name}
                        avatar={item.user.avatar.url}
                        comment={item.comment}
                        commentId={item._id}
                        key={item._id}
                        postId={postId}
                        isAccount={isAccount}

                        />
                    })

                ):(
                    <Typography>No Comments yet</Typography>
                )
            }
                </div>
            </Dialog>
            <Dialog open={captionToggle} onClose={() => setCaptionToggle(!captionToggle)}>
                <div className="DialogBox">
                    <Typography variant="h4">Update Caption</Typography>
                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input
                        type="text"
                        value={captionValue}
                        onChange={(e) => setCaptionValue(e.target.value)}
                        placeholder="Caption Here..."
                        required
                    />
                    <Button type="submit" variant="contained">Update</Button>
                    </form>
                </div>
      </Dialog>



        </div>

    )
}
export default Post;