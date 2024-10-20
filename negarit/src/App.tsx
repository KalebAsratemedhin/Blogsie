import { Provider } from "react-redux"
import AppRoutes from "./routes/index"
import { store } from "./app/store"

function App() {

  return (
    <div>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
      

    </div>
  )
}

export default App
