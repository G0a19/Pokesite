import { createSlice, configureStore } from "@reduxjs/toolkit";

import { favorite } from "./Fav";

let names = [];

export const namesReduce = createSlice({
  name: "names",
  initialState: names,
  reducers: {
    // pushNameHandler(state, action) {
    //   state.push(action.payload);
    // },
  },
});

const store = configureStore({
  reducer: {
    names: namesReduce.reducer,
    favorite: favorite.reducer,
  },
});
export const { pushNameHandler } = namesReduce.actions;
export default store;
