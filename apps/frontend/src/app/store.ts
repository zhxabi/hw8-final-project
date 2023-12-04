import { configureStore } from '@reduxjs/toolkit'
// import introReducer from '../features/intro/introSlice'
// import postsReducer from '../features/posts/postsSlice'


export const store = configureStore({
  reducer: {
    // expenseSlice
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

