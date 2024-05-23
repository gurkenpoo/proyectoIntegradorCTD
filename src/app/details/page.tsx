import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/details/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;