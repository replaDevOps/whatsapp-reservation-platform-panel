import { ConfigProvider } from 'antd'
import RouteF from './RouteF'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./shared";
import { useTranslation } from 'react-i18next';
import { client } from './config'; 
import { ApolloProvider } from '@apollo/client/react';
import { AuthProvider } from './context/AuthContext';

function App() {

  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <ApolloProvider client={client}>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: '#0ABAB5',
                  colorError: '#BC302F',
                  fontFamily: isArabic
                  ? "Vazirmatn, sans-serif"
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
          </ApolloProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
