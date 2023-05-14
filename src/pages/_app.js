import "./App.scss"

import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"

import reducer from "@/redux/reducer"
import AfterLoginLayout from "@/layouts/AfterLoginLayout"
import { AuthProvider } from "@/context/auth"

// Prevent fontawesome from dynamically adding its css since we are going to include it manually
config.autoAddCss = false

const store = configureStore({
  reducer,
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AfterLoginLayout>
          <Component {...pageProps} />
        </AfterLoginLayout>
      </AuthProvider>
    </Provider>
  )
}
