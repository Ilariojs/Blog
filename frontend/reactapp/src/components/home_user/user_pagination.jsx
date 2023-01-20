import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import User_post_popup from "./user_post_popup"
import User_comment_popup from "./user_comment_popup"
import StoreContext from "../Services/Context"
import { useContext } from "react"

const UserPagination = () => {
  const [itens, setItens] = useState([])
  const [categories, setCategories] = useState([])
  const [showData, setShowData] = React.useState([])
  const [buttonPopup, setButtonPopup] = useState(false)
  const [commentButtonPopup, setCommentButtonPopup] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [postContent, setPostContent] = useState('')
  const [postId, setPostId] = useState('')
  const [search, setSearch] = useState('')
  const [searchCategories, setSearchCategories] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const [pages, setPages] = React.useState(0)
  const [comment, setComment] = useState('')
  const { loggedName, setLoggedName } = useContext(StoreContext)

  const userComment = {
    comment: comment,
    user_name: loggedName,
    post_id: postId
  }
  React.useEffect(() => {

    setPages(Math.ceil(itens.length / 10))

    setShowData(itens.slice(currentPage * 10, currentPage * 10 + 10))

    if (!searchCategories && !!search) {
      setShowData(itens.filter(filteredData => filteredData.title.includes(search)))
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
  const registerComment = () => {
    fetch(`http://localhost:3000/comment/`, {
      method: 'POST',
      body: JSON.stringify(
        userComment
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
  }

  useEffect(() => {
    fetchData()
    category()
  }, [])

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

      <User_post_popup trigger={buttonPopup}>
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
          <button className="comment" onClick={() => {
            setCommentButtonPopup(true)
          }}>Make a comment</button>
        </div>
        <button className="close_btn" onClick={() => { setButtonPopup(false) }}>X</button>
      </User_post_popup >

      <User_comment_popup trigger={commentButtonPopup}>
        <div className="popup_title">
          <p>Share your ideas</p>
        </div>
        <div className="popup_content">
          <textarea name="" id="" minLength={10} maxLength={100} placeholder="Write your comment here" value={comment} onChange={(e) => {
            setComment(e.target.value)
          }}>

          </textarea>
        </div>
        <div className="btn_container">
          <button className="comment" onClick={() => {registerComment()
            setCommentButtonPopup(false)
            setComment('')
          }}>Done!</button>
        </div>
          <button className="close_btn" onClick={() => { setCommentButtonPopup(false) }}>X</button>
      </User_comment_popup>


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

export default UserPagination