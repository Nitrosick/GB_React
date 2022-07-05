import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Auth.module.css';
import { logIn } from 'src/services/firebase';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await logIn(email, password);
      navigate('/chats', { replace: true });
    } catch (error) {
      setLoading(false);
      setError((error as Error).message);
    } finally {
      setLoading(false);
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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

      {loading && <div className={style.loading}>Loading...</div>}
      {error && (
        <p className={style.error_block} style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
};
