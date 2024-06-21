import React, { Suspense } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./GlobalStyles.css";
import "./index.css";
import { ConfigProvider } from "antd";
import Loader from './Components/Loader/index';
import Accounts from "./Screens/Accounts";
import MainHeader from "./Components/MainHeader";
import DataTableContainer from "./Containers/DataTableContainer";
import PrivateRoute from "./Routes/PrivateRoute";
import EditContainer from "./Containers/EditContainer";
import UseIdleTimeout from "./hooks/UseIdleTimeout";
const Login = React.lazy(() => import("./Containers/Login"));

function App() {
  UseIdleTimeout();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#139696",
          colorLink: "#139696",
          colorInfo: "#139696",
          colorSuccess: "#1ACE7F",
          colorError: "#E15A3C",
          colorWarning: "#FFBF43",
          colorTextBase: "#3C4257",
        },
      }}
    >
      
        <div className="app__mainContainer">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/accounts" element={<PrivateRoute />}>
              <Route path="" element={<DataTableContainer />} />
              <Route path="edit" element={<EditContainer/>}/>
            </Route>
            </Routes>
          </Suspense>
        </div>
      
    </ConfigProvider>
  );
}

export default App;
