import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ToastContainer from "./components/ui/ToastContainer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
