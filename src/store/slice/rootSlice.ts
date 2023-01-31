import { createSlice } from '@reduxjs/toolkit';
import { ROOT_SLICE } from '@/constant';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store/index'

type ModuleData = 'synthesis' | 'pollution' | 'water'
interface InitialState {
  module: ModuleData
}

const rootSlice = createSlice({
  name: ROOT_SLICE,
  initialState: {
    module: 'synthesis'
  } as InitialState,
  reducers: {
    setModule: (state, action:PayloadAction<ModuleData>) => ({...state, module:action.payload})
  },
})

export const {setModule} = rootSlice.actions
export default rootSlice.reducer
