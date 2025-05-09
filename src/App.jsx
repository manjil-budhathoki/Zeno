// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import UploadConvert from './pages/UploadConvert';
import Feedback from './pages/Feedback';
import Navbar from './components/Navbar';

export default function App() {
  const location = useLocation();

  return (
    <>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/convert/ipynb-to-pdf" element={<UploadConvert />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      <Navbar />
    </>
  );
}
