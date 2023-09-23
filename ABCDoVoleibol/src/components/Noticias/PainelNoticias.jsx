import React, { useState, useEffect } from "react";
import axios from "axios";
import "./painelnoticias.css";
import { Link } from "react-router-dom";

export const PainelNoticias = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("https://shark-app-6myi8.ondigitalocean.app/api/noticias?populate=*")
            .then((response) => {
                const { data } = response.data;
                const sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse();
                const filteredData = sortedData.slice(0, 9);
                setPosts(filteredData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="news-container">
            <div>
                <h1>Noticias</h1>
                <hr size="6" width="100%" align="left" color="black"></hr>
            </div>
            <div className="news-grid">
                {posts.map((post, index) => (
                    <div key={post.id} className="news-item">
                        <div className="news-img-container">
                            <img src={post?.attributes.imagem.data.attributes.url} alt={post?.attributes?.titulo} loading="lazy" />
                        </div>
                        <div className="news-text-container">
                            <h3 className="news-text-title">{post?.attributes?.titulo}</h3>
                            <p className="news-text-content">{post?.attributes?.texto}</p>
                            <div className="news-link-container">
                                <Link to={`/noticias/${post?.id}`} className="news-link">
                                    Ver notícia completa
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};