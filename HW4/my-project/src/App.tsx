import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { ProductList } from "./pages/mainpage/MainPage.tsx";
import { ProductDetail } from "./pages/PageProduct/PageProduct.tsx";
import { CategoryList } from './pages/category/Category.tsx';
import { UserProfile } from './pages/user_profile/UserProfile.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:Id" element={<ProductDetail />} />
        <Route path="/category" element={<CategoryList />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
