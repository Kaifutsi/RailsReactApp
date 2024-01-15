import React, { useEffect, useState, useRef } from 'react';
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';


const AdminPage = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(true);
  const [publishDate, setPublishDate] = useState('');
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentNewsId, setCurrentNewsId] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const navigate = useNavigate();

  const imageInputRef = useRef(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3001/admin/news');
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const createOrUpdateNews = async () => {
    const formData = new FormData();
    formData.append('news[title]', title);
    formData.append('news[content]', content);
    formData.append('news[published]', published);
    formData.append('news[publish_date]', publishDate);

    if (image) {
      formData.append('news[image]', image, image.name);
    }

    let url = 'http://localhost:3001/admin/news';
    let method = 'POST';
    if (editing) {
      url = `http://localhost:3001/admin/news/${currentNewsId}`;
      method = 'PUT';
    }

    try {
      const response = await fetch(url, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        await fetchNews();
        setTitle('');
        setContent('');
        setPublished(true);
        setPublishDate('');
        setImage(null);
        setEditing(false);
        setCurrentNewsId(null);
        if (imageInputRef.current) {
          imageInputRef.current.value = '';
        }
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error creating/updating news:', error);
    }
  };

  const deleteNews = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/admin/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const cancelEdit = () => {
    setTitle('');
    setContent('');
    setPublished(true);
    setPublishDate('');
    setImage(null);

    setEditing(false);
    setCurrentNewsId(null);
  };

  const startEditNews = (newsItem) => {
    setTitle(newsItem.title);
    setContent(newsItem.content);
    setPublished(newsItem.published);
    setPublishDate(newsItem.publish_date);
    setImage(null);
    setCurrentNewsId(newsItem.id);
    setEditing(true);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleBack = () => {
    navigate('/', { state: { scrollToTitle: true } });
  };

  return (
    <div className="admin-page">
      <h1>Панель администратора</h1>
      <h2>{editing ? 'Редактировать новость' : 'Создать новость'}</h2>
      <div>
        <label>Заголовок:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Содержание:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label>Опубликовать:</label>
        <input type="checkbox" checked={published} onChange={() => setPublished(!published)} />
      </div>
      <div>
        <label>Дата публикации:</label>
        <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} />
      </div>
      <div>
        <label>Изображение:</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} ref={imageInputRef} />
      </div>
      <button onClick={createOrUpdateNews}>Сохранить</button>
      {editing && (<button onClick={cancelEdit}>Отмена</button>)}
      {saveSuccess && (
      <div className="success-message">
        Сохранено успешно!
      </div>
      )}

      <h2>Список новостей</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong>
            <p>{item.content}</p>
            {item.image && item.image.url ? (
              <img src={`http://localhost:3001${item.image.url}`} alt={item.title} />
            ) : (
              <div className="no-image">Нет изображения</div>
            )}
            <button onClick={() => startEditNews(item)}>Редактировать</button>
            <button onClick={() => deleteNews(item.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={handleBack} className="back-button">Назад</button>
    </div>
  );
};

export default AdminPage;
