import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './UserAlbumsPage.css';

const UserAlbumsPage = () => {
  const { userId } = useParams();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then(response => {
        setAlbums(response.data);
      })
      .catch(error => console.error('Error fetching albums:', error));
  }, [userId]);

  return (
    <div className="container-album-listpage">
    <div className="user-albums-container">
      <h2 className="user-albums-title">User's Album List Page</h2>
      <ul className="user-albums-list">
        {albums.map(album => (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default UserAlbumsPage;
