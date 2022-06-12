import { FC, useContext, useState } from 'react';
import { ThemeContext } from 'src/utils/ThemeContext';
import { toggleProfile, changeName } from 'store/profile/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'store/profile/reducer';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Profile.module.css';

export const Profile: FC = () => {
  const [value, setValue] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);
  const visible = useSelector((state: ProfileState) => state.visible);
  const name = useSelector((state: ProfileState) => state.name);

  const dispatch = useDispatch();

  return (
    <>
      <div className={style.profile}>
        <div className={style.profile_theme}>
          <span className={style.profile_name}>Profile name: {name}</span>
          <div className={style.plug}></div>
          <span>Color theme:</span>
          <button className={style.profile_theme_toggle} onClick={toggleTheme}>{theme === 'light' ? '🌞' : '🌙'}</button>
        </div>
        <hr />
        <div className={style.profile_settings}>

          <MUIInput
            id={style.name_input}
            type="text"
            value={value}
            placeholder="New profile name..."
            onChange={(e) => setValue(e.target.value)}
          />

          <MUIButton
            id={style.name_change}
            type="submit"
            variant="contained"
            onClick={() => {
              dispatch(changeName(value));
              setValue('');
            }}
          >
            Change
          </MUIButton>

          <div className={style.plug}></div>
          <input className={style.visibility_checkbox} type="checkbox" checked={visible} readOnly />
          <button className={style.visibility_toggle} onClick={() => dispatch(toggleProfile())}>Visibility</button>
        </div>
      </div>
    </>
  );
};