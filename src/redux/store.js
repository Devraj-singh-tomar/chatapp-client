import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducres/auth";
import api from "./api/api";
import miscSlice from "./reducres/misc";
import chatSlice from "./reducres/chat";

const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
