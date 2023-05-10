import "./App.scss"

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"

import reducer from "@/redux/reducer"
import AfterLoginLayout from "@/layouts/AfterLoginLayout"

const store = configureStore({
  reducer,
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AfterLoginLayout>
        <Component {...pageProps} />
      </AfterLoginLayout>
    </Provider>
  )
}
