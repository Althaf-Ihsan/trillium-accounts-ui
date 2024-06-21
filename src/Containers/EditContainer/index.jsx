import React, { useState } from "react";
import { Button, Layout, Breadcrumb } from "antd";
import SideBar from "../../Components/Sidebar";
import MiddleScreen from "../../Components/MiddleScreen";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import "./style.css";
import LastPanel from "../../Components/LastPanel";
const { Header, Sider, Content } = Layout;
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Toaster } from "react-hot-toast";
import MainHeader from "../../Components/MainHeader";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../Helpers/enums";
const EditContainer = () => {
  const patient = JSON.parse(localStorage.getItem("patient"));
  console.log(patient, "patient");
  const navigate = useNavigate();
  return (
    <>
      <MainHeader />
      <Layout>
        <SideBar />
        <div className="tab-container">
          <div className="tab-header">
            <Header>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  padding: "10px 0px",
                  alignItems: "center",
                  justifyContent: "",
                }}
              >
                <Button
                  type="primary"
                  size="small"
                  ghost
                  onClick={() => navigate("/accounts")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: ".4rem",
                  }}
                >
                  <KeyboardReturnIcon
                    fontSize="small"
                    style={{ marginRight: 2, fontSize: 18 }}
                  />
                  Back
                </Button>
                <Breadcrumb
                  className="semibold subheading-small"
                  style={{ marginLeft: "50px" }}
                  items={[
                    {
                      title: (
                        <p style={{ marginRight: "5px" }}>
                          <span>{patient.firstName}</span>
                          <span style={{ marginLeft: "5px" }}>
                            {patient.lastName}
                          </span>
                          <span style={{ marginLeft: "8px" }}>
                            {formatDate(patient.ldos)}
                          </span>
                        </p>
                      ),
                    },
                    {
                      title: (
                        <p>
                          <span
                            style={{ marginRight: "5px", color: "#139696" }}
                          >
                            Paid
                          </span>
                          $200
                        </p>
                      ),
                    },
                    {
                      title: (
                        <p>
                          <span
                            style={{ marginRight: "5px", color: "#139696" }}
                          >
                            Ins Bal
                          </span>
                           {`$${patient.insuranceBalance}.00`}
                        </p>
                      ),
                    },
                    {
                      title: (
                        <p>
                          <span
                            style={{ marginRight: "5px", color: "#139696" }}
                          >
                            Pat Bal
                          </span>
                          $200
                        </p>
                      ),
                    },
                  ]}
                  separator=" "
                />
              </div>
            </Header>
          </div>

          <div className="tabs">
            <MiddleScreen />
            <LastPanel />
          </div>
        </div>
      </Layout>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
export default EditContainer;
