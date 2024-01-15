import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './NewsPage.css';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/news/${id}`)
      .then(response => response.json())
      .then(data => setNewsItem(data))
      .catch(error => console.error('Error:', error));
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleHomeClick = () => {
    navigate('/', { state: { scrollToTitle: true } });
  };

  return (
    <div className="newspage">
      {newsItem ? (
        <>
          <h1>{newsItem.title}</h1>
          <p>{newsItem.content}</p>
          <div className="image-and-buttons">
            {newsItem.image && newsItem.image.url && (
              <img src={`http://localhost:3001${newsItem.image.url}`} alt={newsItem.title} />
            )}
            <div className="buttons">
              <button onClick={handleBackClick}>Назад</button>
              <button onClick={handleHomeClick}>Главная</button>
            </div>
          </div>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default NewsPage;
