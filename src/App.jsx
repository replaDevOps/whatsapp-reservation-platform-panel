import { ConfigProvider } from 'antd'
import RouteF from './RouteF'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./shared";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#0ABAB5',
              colorError: '#BC302F',
            },
            components:{
              Timeline: {
                dotBg: 'transparent',
              },
            }
          }}
        >
          <RouteF />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
