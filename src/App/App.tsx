import React from "react";
import { AppRoutes } from "../utilities/routes/routes";
import { Provider } from "react-redux";
import store from "../utilities/redux/store";
import GlobalsProvider from "../utilities/globals/GlobalsProvider";
import { AuthProvider } from "../utilities/hooks/useAuth";

const App = React.memo(() => {
  return <Provider store={store}>
    <GlobalsProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </GlobalsProvider>
  </Provider>
})

export default App;