import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from 'src/store/profile/slice';
import { useNavigate } from 'react-router-dom';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Auth.module.css';

export const SignIn: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    if (login === 'gb' && password === 'gb') {
      dispatch(auth(true));
      navigate('/', { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <div className={style.auth}>
      <form onSubmit={handleSubmit}>
        <label className={style.auth_label} htmlFor="login">
          Login:
        </label>
        <MUIInput
          id="login"
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <label className={style.auth_label} htmlFor="password">
          Password:
        </label>
        <MUIInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <MUIButton id={style.auth_login} type="submit" variant="contained">
          Go
        </MUIButton>
      </form>

      {error && (
        <p className={style.error_block} style={{ color: 'red' }}>
          Incorrect login or password
        </p>
      )}
    </div>
  );
};
