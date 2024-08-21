import { Typography } from "@mui/material"
import { getfollowingPosts } from "../../Actions/User"
import {useDispatch} from 'react-redux'

function Home(){
    const dispatch=useDispatch();
    const {loading,posts,error}=useSelector((state)=>state.postoffollowing);
    const {loading:userLoading ,users}=useSelector((state)=>state.alluser);
    useEffect(()=>{
        dispatch(getfollowingPosts());
        dispatch(getAllusers());
    },[dispatch])
    return (
        <div className="home">
            <div className="left-home">
                {
                    posts && posts.length>0?(posts.map((post)=>{
                        <Post
                        key={post._id}
                        postId={post._id}
                        caption={post.caption}
                        postImage={post.image.url}
                        likes={post.likes}
                        comment={post.comment}
                        ownerImage={post.owner.image.url}
                        ownerName={post.owner.name}
                        ownerId={post.owner._id}
                        />

                    })):<Typography>No Post found</Typography>
                }
                
            </div>
            <div className="right-home">
                {
                    users && users.length()>0?(users.map((user)=>{
                        <User
                        key={user._id}
                        userId={user._id}
                        name={user.name}
                        avatar={user.avatar.url}
                        />
                    })):<Typography>No Users</Typography>
                }

            </div>
        </div>
    )
}