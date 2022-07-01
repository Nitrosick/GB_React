import { FC, useEffect } from 'react';
import MUIButton from '@mui/material/Button';
import style from './Articles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from 'src/store';
import { fetchData } from 'src/store/articles/slice';

export const Articles: FC = () => {
  const articles = useSelector((store: StoreState) => store.articles.articles);
  const loading = useSelector((store: StoreState) => store.articles.loading);
  const error = useSelector((store: StoreState) => store.articles.error);
  const dispatch = useDispatch() as any;

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div className={style.articles}>
      <h2>Space News</h2>

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul className={style.articles_list}>
          {articles.map((article) => (
            <li key={article.id}>&bull; {article.title}</li>
          ))}
        </ul>
      )}

      <MUIButton
        onClick={() => dispatch(fetchData())}
        variant="contained"
        fullWidth
      >
        Get data
      </MUIButton>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
