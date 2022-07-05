import { FC, useState } from 'react';
import { signUp } from 'src/services/firebase';
import { useNavigate } from 'react-router-dom';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Auth.module.css';

export const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signUp(email, password);
      setError('');
      navigate('/signin', { replace: true });
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
          Sign up
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
