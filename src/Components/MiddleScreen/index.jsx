import React, { useState } from "react";
import { Button, ConfigProvider, Layout, Modal, Table, Input } from "antd";
import MiddlePanel from '../MiddlePanel'
import AddIcon from "@mui/icons-material/Add";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import Edit from "@mui/icons-material/Edit";
import "./style.css";
const { Content } = Layout;

const MiddleScreen = () => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const closeAdd = () => {
    setOpenAdd(false);
  };


  return (
    <div >
 
      <Content style={{ padding: "0px 0px 0px 47px " }}>
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <MiddlePanel/>
        </div>
      </Content>
    </div>
  );
};

export default MiddleScreen;
