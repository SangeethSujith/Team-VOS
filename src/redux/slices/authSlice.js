import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    userData: []
}

const authSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setSignIn: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.userData = action.payload.userData
        },
        setSignOut: (state) => {
            state.isLoggedIn = false;
            state.userData = []
        }
    }
});

export const { setSignIn, setSignOut } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.userAuth.isLoggedIn;

export default authSlice.reducer;