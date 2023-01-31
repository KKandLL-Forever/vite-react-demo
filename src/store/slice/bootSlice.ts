import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BOOT_SLICE, ASYNC_GET_IDS_UNITS } from '@/constant'
import request from '@/service/axios'
import { Table } from '@/utils/structUtil';
import storage from "@/utils/storage";


interface IdsUnitsData {
  idTable: Table,
  unitTable: Table
}

export const asyncGetIdsUnits = createAsyncThunk(
  ASYNC_GET_IDS_UNITS,
  async (payload:string) => {
    let token
    token = window.location.search
      .substring(1)
      .replace('token=', '');
    
    if (token) {
      storage.setItem('token', token);
    }
    const {data} = await request(payload, {})
    const idTable = new Table('id', data.id)
    const unitTable = new Table('unit', data.unit)
    return {
      idTable: idTable,
      unitTable: unitTable
    } as IdsUnitsData
  }
)

const {reducer: bootReducer} = createSlice({
  name: BOOT_SLICE,
  initialState: {
    idTable: {},
    unitTable: {}
  } as IdsUnitsData,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(asyncGetIdsUnits.fulfilled, (state, {payload}) => ({...state, ...payload}))
  }
  // extraReducers: {
  //   [asyncGetIdsUnits.fulfilled]: (state, {payload}) => ({...state, ...payload})
  // }
})

export default bootReducer
