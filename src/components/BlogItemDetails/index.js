import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

// const blogData = {
//   title: 'Blog Name',
//   imageUrl: 'https://assets.ccbp.in/frontend/react-js/placeholder-3-img.png',
//   avatarUrl: 'https://assets.ccbp.in/frontend/react-js/avatar-img.png',
//   author: 'Author Name',
//   content:
//     'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
// }

class BlogItemDetails extends Component {
  state = {
    eachBlog: {},
    isLoading: true,
  }

  componentDidMount() {
    this.eachBlogContent()
  }

  eachBlogContent = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const eachBlogsData = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const eachData = await eachBlogsData.json()

    const modifiedData = {
      title: eachData.title,
      imageUrl: eachData.image_url,
      content: eachData.content,
      avatarUrl: eachData.avatar_url,
      author: eachData.author,
    }

    this.setState({eachBlog: modifiedData, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {eachBlog} = this.state
    const {title, imageUrl, content, avatarUrl, author} = eachBlog

    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? (
      <Loader className="loader" />
    ) : (
      <div className="blog-container">{this.renderBlogItemDetails()}</div>
    )
  }
}

export default BlogItemDetails
