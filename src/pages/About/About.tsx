import { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StoreState } from 'src/store';
import { toggleProfile } from 'src/store/profile/actions';

import style from './About.module.css';

export const About: FC = (props: any) => {
  return (
    <>
      <div className={style.about_page}>
        <h2>About page | {props.name}</h2>
        <div className={style.plug}></div>
        <input type="checkbox" checked={props.visible} readOnly />
        <button onClick={() => props.toggle()}>Visibility</button>
      </div>
    </>
  );
};

const mapStateToProps = (state: StoreState) => ({
  name: state.profile.name,
  visible: state.profile.visible,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: () => dispatch(toggleProfile()),
});

export const AboutWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(About);