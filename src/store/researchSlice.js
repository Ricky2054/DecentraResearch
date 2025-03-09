import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  papers: [],
  loading: false,
  error: null,
}

const researchSlice = createSlice({
  name: 'research',
  initialState,
  reducers: {
    setPapers: (state, action) => {
      state.papers = action.payload
    },
    addPaper: (state, action) => {
      state.papers.push(action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setPapers, addPaper, setLoading, setError } = researchSlice.actions
export default researchSlice.reducer