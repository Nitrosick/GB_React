import { profileReducer } from "src/store/profile/reducer";

test('Reducers test', () => {
    const state = profileReducer(
        {
          name:'New name',
          visible:false
        }, {type:'PROFILE::TOGGLE_PROFILE'}
    );

    expect(state).toEqual({ name:'New name', visible:true });
});