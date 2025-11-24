import { ConfigProvider } from 'antd'
import RouteF from './RouteF'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux";
import { store } from "./shared";
import { client } from './config'; 
import { ApolloProvider } from '@apollo/client/react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);


function App() {
  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  )
}

export default App
