import { createSlice } from "@reduxjs/toolkit";

const favorites = [];

if (JSON.parse(localStorage.getItem("favorites"))) {
  const names = JSON.parse(localStorage.getItem("favorites"));
  names.map((name) => favorites.push(name));
}

export const favorite = createSlice({
  name: "favorite",
  initialState: favorites,
  reducers: {
    toggleFavorites(state, action) {
      if (state.includes(action.payload)) {
        localStorage.setItem(
          "favorites",
          JSON.stringify(state.filter((pokemon) => pokemon !== action.payload))
        );
        return state.filter((pokemon) => pokemon !== action.payload);
      } else {
        localStorage.setItem(
          "favorites",
          JSON.stringify([...state, action.payload])
        );
        return [...state, action.payload];
      }
    },
  },
});

export const { toggleFavorites } = favorite.actions;
