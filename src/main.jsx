import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
// import { persistor} from "./firebase/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      {/* <PersistGate persistor={persistor}> */}
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </BrowserRouter>
      {/* </PersistGate> */}
  </StrictMode>,
);
