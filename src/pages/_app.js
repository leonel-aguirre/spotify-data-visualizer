import "./App.scss"

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

import reducer from "@/redux/reducer"
import AfterLoginLayout from "@/layouts/AfterLoginLayout"

// Prevent fontawesome from dynamically adding its css since we are going to include it manually
config.autoAddCss = false

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
