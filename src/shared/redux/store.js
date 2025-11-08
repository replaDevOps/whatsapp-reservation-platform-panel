import { configureStore } from "@reduxjs/toolkit";
import {
	app,
} from "./action"
const store = configureStore({
	reducer: {
		app,
	},
})
export default store