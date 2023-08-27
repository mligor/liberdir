import React from 'react';
import RelativeTime from '../general/RelativeTime';

import './item.scss';
import { Article } from './medium';

const Item = ({ article }: { article: Article }) => {
  return (
    <div className="item">
      {article.image && <img className="image" src={article.image} alt="news_image" />}
      {article.link ? (
        <a
          href={article.link}
          target="_blank"
          rel="noreferrer"
          className="title"
          dangerouslySetInnerHTML={{ __html: article.title ?? '' }}
        ></a>
      ) : (
        <div className="title" dangerouslySetInnerHTML={{ __html: article.title ?? '' }}></div>
      )}
      <div className="time">
        <RelativeTime time={article.date}></RelativeTime>
      </div>
      <div className="description" dangerouslySetInnerHTML={{ __html: article.text ?? '' }}></div>
    </div>
  );
};

export default Item;
