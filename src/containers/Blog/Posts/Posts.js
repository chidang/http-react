import React, { Component } from 'react';
import axios from '../../../axios';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
import Post from '../../../components/Post/Post';
import { Link } from 'react-router-dom';
import './Posts.css';

class Posts extends Component{
  state = {
    posts: [],
    selectedId: null,
    error: false
  }

  componentDidMount () {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatePosts = posts.map(post => {
          return {
              ...post,
              author: 'Chi'
          }
        });
        this.setState({ posts: updatePosts });
      })
      .catch(error => {
        this.setState({error: true});
      });
  }

  postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/posts/' + id});
    // this.props.history.push('/' + id);
  }

  render () {
    let posts = <p>Something went wrong</p>;
    if (!this.state.error){
        posts = this.state.posts.map( post => {
            return (
              <Link to={'/posts/' + post.id} key={post.id}>
                  <Post 
                  title={post.title}
                  author={post.author}
                  {...this.props}
                  clicked={() => this.postSelectedHandler(post.id)}
                />
              </Link>
            )
        });
    }
    return (
      <section className="Posts">
        {posts}
      </section>
    );
  }
}

export default Posts;