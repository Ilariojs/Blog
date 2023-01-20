import React, { useEffect } from "react";
import { useState } from "react";
import Post_popup from "./Post_popup";
import Comments_popup from "./Comments_popup";

const Pagination = () => {
  const [itens, setItens] = useState([])
  const [categories, setCategories] = useState([])
  const [comment, setComment] = useState([])
  const [showData, setShowData] = React.useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [commentPopup, setCommentPopup] =  useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postId, setPostId] = useState('')
  const [search, setSearch] = useState('')
  const [searchCategories, setSearchCategories] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setPages] = React.useState(0)


  const filteredComments = comment?.filter(comments => {
    return comments.post_id == postId 
  })

  React.useEffect(() => {

    setPages(Math.ceil(itens.length / 10))

    setShowData(itens.slice(currentPage * 10, currentPage * 10 + 10))

    if (!searchCategories && !!search) {
      setShowData(itens.filter(filteredItems => filteredItems.title.includes(search)))
    }

    else if (!search && !!searchCategories) {
      setShowData(itens.filter(filteredCategories => filteredCategories.category_id == searchCategories))
    }

    else if (!!search && !!searchCategories) {
      setShowData(itens.filter(filteredCategories => filteredCategories.category_id == searchCategories).filter(item => item.title.includes(search)))
    }
  }, [itens, search, searchCategories, currentPage])

  // api para teste https://jsonplaceholder.typicode.com/todos
  const fetchData = () => {
    fetch('http://localhost:3000/post')
      .then(response => response.json())
      .then(data => setItens(data))
  }

  const category = () => {
    fetch('http://localhost:3000/category')
      .then(response => response.json())
      .then(data => setCategories(data))
  }
  const getComments = () => {
    fetch('http://localhost:3000/comment')
      .then(response => response.json())
      .then(data => setComment(data))
  }
  useEffect(() => {
    fetchData()
    category()
    getComments()
  }, [])

  const deletePost = () => {
    fetch(`http://localhost:3000/post/${postId}`, {
      method: 'DELETE'
    })
      .then(response => {
        setButtonPopup(false)
        fetchData()
      })
      .catch(error => console.error('Error:', error));
  }

  const editPost = () => {
    const post = {
      title: postTitle,
      content: postContent
    }
    fetch(`http://localhost:3000/post/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post)
    })
      .then(() => {
        setButtonPopup(false)
        fetchData()
      })
      .catch(() => window.alert('error'))
  }

  return (
    <div className="home_autor_posts">
      <div className="home_autor_posts_search">
        <input type="text" onChange={(e) => {
          setSearch(e.target.value)
        }} />
        <select name="" id="" onChange={(e) => {
          setSearchCategories(e.target.value)
        }}>
          <option value="">All</option>
          {categories.map(item => {
            return (
              <option value={item.id}>{item.name}</option>
            )
          })}
        </select>
      </div>
      <div className="home_autor_posts_itens">
        {
          showData.map(item => {
            console.log(item)
            return (
              <>
                <div className="item" onClick={() => {
                  setButtonPopup(true)
                  setPostTitle(item.title)
                  setPostContent(item.content)
                  setPostId(item.id)
                }}>
                  {item.title}
                  <span className="item_span">Open to see</span>
                </div>
              </>
            )
          })
        }
      </div>

      <Post_popup trigger={buttonPopup}>
        <div className="popup_title">
          <input type="text" value={postTitle} onChange={(e) =>
            setPostContent(e.target.value)
          } />
        </div>
        <div className="popup_content">
          <textarea name="" id="" onChange={(e) => {
            setPostContent(e.target.value)
          }}>
            {postContent}
          </textarea>
        </div>
        <div className="btn_container">
          <button className="edit_btn" onClick={() => {
            editPost()
          }}>Edit</button>
          <button className="delete_btn" onClick={() => {
            deletePost()
          }}>Delete</button>
          <button className="comment" onClick={()=>{
            setCommentPopup(true)
          }}>See the comments</button>
        </div>
        <button className="close_btn" onClick={() => { setButtonPopup(false) }}>X</button>
      </Post_popup>

      <Comments_popup trigger={commentPopup}>
        <div className="popup_title">
          <p>Comments</p>
        </div>
        <div className="popup_content">
          {
            filteredComments.map(item => {
              return(
                <div className="popup_content_card">
                  <h1>{item.user_name} :</h1>
                  <p>{item.comment}</p>
                </div>
              )
            })
          }
        </div>
        <button className="close_btn" onClick={() => { setCommentPopup(false) }}>X</button>
      </Comments_popup>    
      
      <div className="home_autor_posts_buttons">
        {Array.from(
          Array(pages), ((item, index) => {
            return <button value={index} onClick={(e) =>
              setCurrentPage(Number(e.target.value))
            } >{index + 1}</button>
          })
        )}
      </div>
    </div>
  )
}
export default Pagination