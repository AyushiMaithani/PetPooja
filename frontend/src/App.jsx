import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import {Home,Auth,Orders,Tables} from './pages';
import Header from './components/shared/Header';
import Menu from "./pages/Menu";
import { useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const hideHeaderRoutes = ["/auth"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <>
        <Router>
          <Layout />        
        </Router>
    </>
  )
}

export default App