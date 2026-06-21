import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScreenerPage from './pages/screener/ScreenerPage';
import Header from './components/common/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ScreenerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;