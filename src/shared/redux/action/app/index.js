import { createSlice} from '@reduxjs/toolkit'


const AppSlice = createSlice({
    name: 'app',
    initialState: {
        language: null,
    },
    reducers: {
        changeLanguage: (state, action) => {
            state.language = action.payload;
        },
    }
})

export const {
    changeLanguage
} = AppSlice.actions
export default AppSlice.reducer