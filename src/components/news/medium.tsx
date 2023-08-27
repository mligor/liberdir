import React from 'react';
import Item from './item';
import axios from 'axios';

import './medium.scss';

var jsonpath = require('jsonpath');

export class Article {
  id?: React.Key;
  title?: string;
  text?: string;
  image?: string;
  date?: string;
  link?: string;
}

const Medium = (prop: any) => {
  const { title, url, fields, linkPrefix } = prop.item;

  const [articles, setArticles] = React.useState<Article[]>([]);

  React.useEffect(() => {
    //     const testURL = 'http://localhost:8088/https://api.liberland.org/news?lang=en&page=1&limit=2&order=-published';
    //     const myInit = {
    //   method: 'HEAD',
    //   mode: 'no-cors',
    //     };

    //     const myRequest = new Request(testURL, myInit);

    //     fetch(myRequest).then(function(response) {
    //       setArticles(response)
    //     }).then(function(response) {
    //       console.log(response);
    //     }).catch(function(e){
    //       console.log(e);
    //     });

    axios({
      method: 'get',
      url,
      withCredentials: false,
      //mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
          'Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length',
      },
    }).then((response) => {
      let articles = [];
      let data = response.data;

      if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          const element = data[i];
          let newArticle: Article = {};

          for (const [key, value] of Object.entries(fields)) {
            if (value === '-') continue;
            let v = jsonpath.query(element, value);
            if (v !== undefined) {
              if (key === 'link' && linkPrefix) {
                v = linkPrefix + v;
              }
              (newArticle as any)[key] = v;
            }
          }

          articles.push(newArticle);
        }
      }

      setArticles(articles);
    });
  }, [url, fields, linkPrefix]);

  const items = articles.map((article) => <Item key={article.id} article={article} />);

  return (
    <div className="medium">
      <div className="medium-title">{title}</div>
      <div>{items}</div>
    </div>
  );
};

export default Medium;
