import {OrderItemProvider} from './contexts/OrdemItemContext';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

function App() {
  return (
    <OrderItemProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </OrderItemProvider>   
  );
}

export default App;
