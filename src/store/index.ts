import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  ASYNC_GET_IDS_UNITS,
  BOOT_SLICE,
  MAP_SLICE,
  ROOT_SLICE,
  SYNTHESIS_SLICE,
  POLLUTION_SLICE
} from '@/constant'
import mapSlice from '@/store/slice/mapSlice'
import synthesisSlice from '@/store/slice/synthesisSlice'
import bootSlice from '@/store/slice/bootSlice'
import rootSlice from '@/store/slice/rootSlice'
import pollutionSlice from "@/store/slice/pollutionSlice";


const store = configureStore({
  reducer: {
    [BOOT_SLICE]: bootSlice,
    [ROOT_SLICE]: rootSlice,
    [MAP_SLICE]: mapSlice,
    [SYNTHESIS_SLICE]: synthesisSlice,
    [POLLUTION_SLICE]: pollutionSlice
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ASYNC_GET_IDS_UNITS],
        ignoredActionPaths:['payload'],
        ignoredPaths: ['boot_slice.idTable','boot_slice.unitTable']
      },
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export default store
