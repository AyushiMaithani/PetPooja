import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    email: "",
    phone: "",
    role: "",
    isAuth: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.role = action.payload.role;
            state.isAuth = true;
        },
        removeUser: (state) => {
            state._id = "";
            state.name = "";
            state.email = "";
            state.phone = "";
            state.role = "";
            state.isAuth = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;