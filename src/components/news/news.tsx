import Medium from './medium';

var news = require('./sources.json');

if (process.env.NODE_ENV === 'development') {
  news = require('./sources.dev.json');
}

const News = () => {
  return (
    <div id="news">
      {news.map((item: any, idx: number) => {
        return <Medium key={idx} item={item} />;
      })}
    </div>
  );
};

export default News;
