import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Layout, Menu, Dropdown, Space, Descriptions } from "antd";
import "./style.css";
import { useSelector } from "react-redux";
import { selectPatientById } from "../../Redux/Accounts/acccounts.reducer";

const { Sider } = Layout;
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};
const items = [
  {
    label: "1st menu item",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "2nd menu item",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "3rd menu item",
    key: "3",
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: "4th menu item",
    key: "4",
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];



const menuProps = {
  items
};

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData) {
      try {
        // Ensure data is in array format
        const dataArray = Array.isArray(patientData) ? patientData : [patientData];
        setData(dataArray);
      } catch (e) {
        console.error("Failed to parse patient data from localStorage", e);
      }
    }
  }, []);

  console.log(data);
  return (
    <Sider
      width={!collapsed ? 255 : 40}
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: "white",
        marginLeft: "25px",
        marginTop: "10px",
        marginBottom: "60px",
        display: "flex",
        minHeight: "100vh",
      }}
      className={collapsed ? "collapsedSidebar" : ""}
    >
      <div>
        <div
          className="firstRow-sideBar"
          style={{
            display: "flex",
            height: "4rem",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
            borderBottom: !collapsed ? "1px solid #C1C9D2" : "none",
          }}
        >
          {!collapsed && (
            <Dropdown menu={menuProps} className="dropdown-menu">
              <Button style={{ display: "flex", alignItems: "center" }}>
                <Space>
                  <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                    Search for results
                  </div>
                  <ExpandMoreIcon />
                </Space>
              </Button>
            </Dropdown>
          )}
          <Button
            type="text"
            icon={<MenuIcon style={{ color: "#8792A2" }} />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </div>
      {data.map((item,index)=>{
        return <div
        key={index}
        className="sideBarContent"
        style={{
          padding: "10px",
          borderBottom: "1px solid #C1C9D2",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            padding: "10px",
            border: "1px solid #8792A2",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              gap: "10px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#8792A2" }}>
              {item.firstName} {item.lastName} {item.ldos ? <span>({formatDate(item.ldos)})</span> : null}         </span>
            <a href="#">Edit</a>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              color: "#8792A2",
            }}
          >
            <span>shwarts, BMD</span>
            <span>BCBS OF TX</span>
          </div>
        </div>
      </div>
      })}
      </div>
    </Sider>
  );
};

export default SideBar;
