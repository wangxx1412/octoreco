import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Carousel } from 'react-bootstrap'
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import { IconContext } from "react-icons";

export const renderPosts = (posts, like, likes, save, likeToggle, saveToggle) => { 
    const s3Url = "https://s3-us-west-2.amazonaws.com/octoreco-bucket-1/";
    return posts.map((post, index)=>{
        return (
            <div key={post._id} className="md:ml-20">
            <Card key={index} style={{maxWidth:"600px", marginBottom:"60px"}}>
            <Card.Header style={{backgroundColor: "white"}}><b>{post.user.username}</b></Card.Header>
            <Carousel interval={null}>
                {post.imageUrl.map((imgUrl, index)=>{
                    return <Carousel.Item key={imgUrl+index}>
                            <Card.Img variant="top" src={s3Url+imgUrl}/> 
                            </Carousel.Item>
                })}
            </Carousel>
                <Card.Body>
                <Card.Text style={{ position: "relative"}}>
                {like[index] ? (
                    <span style={{ position: "absolute" }} onClick={()=>{likeToggle(post, index)}}>
                    <IconContext.Provider value={{ color: "#E1306C", size:"1.5em", className: "global-class-name" }}>
                    <FaHeart />
                    </IconContext.Provider>
                        {" "}
                        {likes[index]} Like
                    </span>
                ) : (
                    <span style={{ position: "absolute" }} onClick={()=>{likeToggle(post, index)}}>
                    <IconContext.Provider value={{ size:"1.5em", className: "global-class-name" }}>
                    <FaRegHeart />
                    </IconContext.Provider>
                        {" "}
                        {likes[index]} Like
                    </span>
                )}

                {save[index] ? (
                    <span style={{ position: "absolute", right:"10px" }} onClick={()=>{saveToggle(post, index)}}>
                    <IconContext.Provider value={{ size:"1.5em", className: "global-class-name" }}>
                    <FaBookmark />
                    </IconContext.Provider>
                    </span>
                ) : (
                    <span style={{ position: "absolute", right: "10px" }} onClick={()=>{saveToggle(post, index)}}>
                    <IconContext.Provider value={{ size:"1.5em", className: "global-class-name" }}>
                    <FaRegBookmark />
                    </IconContext.Provider>
                    </span>
                )}      
                </Card.Text>
                <div style={{marginTop: "40px"}}> <b>{post.user.username}</b> {post.content}</div>
                <Card.Text>
                    <small className="text-muted" style={{ marginTop:"10px"}}>
                    on {new Date(post.created).toDateString()}
                    </small>
                    <Link to={`/posts/${post._id}`}>
                    <span className="text-purple font-italic" style={{ position: "absolute", right: "10px" }}>
                    <small>Read more...</small> 
                    </span>
                    </Link>
                </Card.Text>
                </Card.Body>
            </Card>
            </div>
        )
    })
}