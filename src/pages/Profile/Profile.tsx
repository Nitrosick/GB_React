import { FC, useEffect, useState } from 'react';
import { profileRef } from 'src/services/firebase';
import { onValue, update } from 'firebase/database';

import MUIInput from '@mui/material/Input';
import MUIButton from '@mui/material/Button';

import style from './Profile.module.css';

export const Profile: FC = () => {
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();

      setName(data.name);
      setVisible(data.visible);
    });

    return unsubscribe;
  }, []);

  const changeName = (name: string) => {
    update(profileRef, {
      name: name,
    });
    setName(name);
  };

  const changeVisibility = () => {
    update(profileRef, {
      visibility: !visible,
    });
    setVisible(!visible);
  };

  const changeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    update(profileRef, {
      theme: newTheme,
    });
    setTheme(newTheme);
  };

  return (
    <>
      <div className={style.profile}>
        <div className={style.profile_theme}>
          <span className={style.profile_name}>Profile name: {name}</span>
          <div className={style.plug}></div>
          <span>Color theme:</span>
          <button className={style.profile_theme_toggle} onClick={changeTheme}>
            {theme === 'light' ? '🌞' : '🌙'}
          </button>
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
              changeName(value);
              setValue('');
            }}
          >
            Change
          </MUIButton>

          <div className={style.plug}></div>
          <input
            className={style.visibility_checkbox}
            type="checkbox"
            checked={visible ? visible : false}
            readOnly
          />
          <button
            className={style.visibility_toggle}
            onClick={changeVisibility}
          >
            Visibility
          </button>
        </div>
      </div>
    </>
  );
};
