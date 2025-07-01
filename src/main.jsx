import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <Toaster position="top-center" reverseOrder={false} />
            <App />
          </BrowserRouter>
        </Provider>
      </PersistGate>
  </StrictMode>,
);
