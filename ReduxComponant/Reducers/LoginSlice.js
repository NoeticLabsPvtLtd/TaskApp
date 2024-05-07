import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    LoginInfo: null
};

const LoginSlice = createSlice({
    name: 'Logininfo',
    initialState,
    reducers: {
        GetLoginInfo(state, action) {
            state.LoginInfo = action.payload
        }
    },
});

export const { GetLoginInfo } = LoginSlice.actions;
export default LoginSlice.reducer;
