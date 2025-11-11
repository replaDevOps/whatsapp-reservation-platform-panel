import { ConfigProvider } from 'antd'
import RouteF from './RouteF'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./shared";
import { useTranslation } from 'react-i18next';

function App() {

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#0ABAB5',
              colorError: '#BC302F',
              fontFamily: isArabic
              ? "IBM Plex Sans Arabic, sans-serif"
              : "ProductSans, sans-serif",
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
