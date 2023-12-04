import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ExpenseObj {
  expenseAmount: number
  owner: string
  comment? : string
  _id: number
  __v: number
}

const initialState : ExpenseObj = {
  expenseAmount: 0
  owner: ""
  _id: -1
  __v: -1
}

export const expenseSlice = createSlice({
  name: 'intro',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
  },
})

export const { setImage, setDescription } = expenseSlice.actions
export const selectImg = (state: RootState) => state.intro.image
export const selectDescription = (state: RootState) => state.intro.description

export default expenseSlice.reducer