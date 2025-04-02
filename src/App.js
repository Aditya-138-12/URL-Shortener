import Header from './components/header/header';
import URL_Shortener from './components/URL_Shortner/urlShortner';
import {Router, Routes, Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<><Header /> <URL_Shortener/></>}/>
        <Route path='/:shortcode' element={<>Redirecting</>}/>
      </Routes>
</BrowserRouter>

    </>
  );
}

export default App;
