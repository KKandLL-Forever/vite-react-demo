import { createSlice } from '@reduxjs/toolkit';
import { ROOT_SLICE } from '@/constant';
import type { PayloadAction } from '@reduxjs/toolkit'

// export enum ModuleData {
//   SYNTHESIS = 'synthesis',
//   POLLUTION = 'pollution',
//   WATER = 'water'
// }

interface InitialState {
  module: string
}

const rootSlice = createSlice({
  name: ROOT_SLICE,
  initialState: {
    module: 'synthesis'
  } as InitialState,
  reducers: {
    setModule: (state, action:PayloadAction<string>) => ({...state, module:action.payload})
  },
})

export const {setModule} = rootSlice.actions
export default rootSlice.reducer
