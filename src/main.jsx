import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global/index.css'
import App from './views/App.jsx'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react' // đảm bảo ứng dụng chỉ chạy khi data từ LocalStorage nạp vào 
// Redux thành công (nếu chưa có data thì k chạy).

import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
