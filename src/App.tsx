/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import router from "./router";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {

  return (
      <div className="app">
        <Header />
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
  );
}

export default App;