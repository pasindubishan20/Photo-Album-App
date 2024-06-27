import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState([]);
  const [totalAlbums, setTotalAlbums] = useState(0);
  const [totalPhotos, setTotalPhotos] = useState(0);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        const fetchedUsers = response.data;
        setUsers(fetchedUsers);
        setUserData({
          totalUsers: fetchedUsers.length,
          totalAlbums: 0,
          totalPhotos: 0,
        });

        // Fetch albums and photos counts for each user
        let albumCount = 0;
        let photoCount = 0;

        fetchedUsers.forEach(user => {
          axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
            .then(albumResponse => {
              albumCount += albumResponse.data.length;
              setTotalAlbums(albumCount);
            })
            .catch(error => console.error(`Error fetching albums for user ${user.id}:`, error));

          axios.get(`https://jsonplaceholder.typicode.com/users/${user.id}/photos`)
            .then(photoResponse => {
              photoCount += photoResponse.data.length;
              setTotalPhotos(photoCount);
            })
            .catch(error => console.error(`Error fetching photos for user ${user.id}:`, error));
        });
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="container">
      <main>
        <header>
          <h5>🖐 Hello <b>Pasindu </b> , welcome back!</h5>
        </header>

        <div className="separator">
          <div className="info">
            <h3>Photo Album</h3>
          </div>
        </div>

        <div className="analytics">
          <div className="item">
            <div className="progress">
              <div className="info">
                <h5>Total Users</h5>
                <p>{userData.totalUsers}</p>
              </div>
              <div className="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div className="item">
            <div className="progress">
              <div className="info">
                <h5>Total Albums</h5>
                <p>{totalAlbums}</p>
              </div>
              <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>
          <div className="item">
  <div className="progress">
    <div className="info">
      <h5>Total Photos</h5>
      <p className="photocounts">{totalPhotos}</p>
    </div>
    <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</div>
        </div>

        <div className="separator">
          <div className="infos">
            <h3>List of Users</h3>
          </div>
        </div>

        <div className="listofusers">
          <div className="item">
            <div className="left">
              <div className="details">
                <ul className="detailnames">
                  {users.map(user => (
                    <li key={user.id}>
                      <Link to={`/user/${user.id}`}>{user.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
