import React,{useState} from 'react'

function DeleteBlog({id}) {
    const [deleteBlog,setDeleteBlog] = useState(false)
    const handleBlogDelete = async () => {
        try {
            const res = await fetch(`https://blogsphere-server-v5il.onrender.com/blog/delete/${id}`, {
                credentials: 'include',
                method: "delete",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const body = await  res.json()
            if(body.message === 'blog deleted successfully'){
                setDeleteBlog(true)
            }else{
                alert(body.message)
            }
        } catch (error) {

        }
    }
    return (
        <>
            <button onClick={handleBlogDelete}><i class="fa-solid fa-trash"></i></button>
        </>
    )
}

export default DeleteBlog