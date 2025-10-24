import { ConfigProvider } from 'antd'
import RouteF from './RouteF'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (

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

  )
}

export default App
