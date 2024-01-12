import React, { useEffect, useState, useCallback } from 'react';
import './NewsListPage.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const NewsListPage = () => {
  const [news, setNews] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const fetchNews = useCallback(() => {
    let url = 'http://localhost:3001/news';
    if (startDate && endDate) {
      const nextDay = new Date(endDate);
      nextDay.setDate(nextDay.getDate() + 1);
      url += `?start_date=${startDate}&end_date=${nextDay.toISOString().split('T')[0]}`;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => setNews(data))
      .catch(error => console.error('Error:', error));
  }, [startDate, endDate]);;

  useEffect(() => {
    fetchNews();
  }, [fetchNews, startDate, endDate]);

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="news-list-page">
      <h1>Список Новостей</h1>
      <div>
        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </div>
      {news.map(item => (
        <div key={item.id} className="news-item">
          <div className="news-content">
            <h2>{item.title}</h2>
            <p>{item.content.substring(0, 200)}...</p>
            <Link to={`/news/${item.id}`} className="read-more-link">Читать далее</Link>
          </div>
          {item.image && item.image.url && (
            <img src={`http://localhost:3001${item.image.url}`} alt={item.title} />
          )}
        </div>
      ))}
      <button onClick={handleHome} className="back-button">Назад</button>
    </div>
  );
};

export default NewsListPage;
