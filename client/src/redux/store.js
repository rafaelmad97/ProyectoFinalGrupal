// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import reducer from "./reducer";

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // o el storage que prefieras utilizar
import reducer from "./reducer";

// Configuración de Redux Persist
const persistConfig = {
  key: "root", // Cambia esto si deseas utilizar una clave diferente
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Creación del store con Redux Persist y middleware
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { store, persistor };
