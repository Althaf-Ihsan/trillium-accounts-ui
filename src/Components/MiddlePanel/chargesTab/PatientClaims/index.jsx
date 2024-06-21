import React, { useState, useCallback } from "react";
import {
  AutoComplete,
  Button,
  ConfigProvider,
  Descriptions,
  Modal,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Diagnosis = ({item}) => {
  const dispatch = useDispatch();

  // State to manage input values
  const [inputValues, setInputValues] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [searchInputs, setSearchInputs] = useState({});

  const handleOpenAdd = () => setOpenAdd(true);
  const closeAdd = () => setOpenAdd(false);



  // Debounce the ICD search function to improve performance
 






  return (
    <div style={{marginTop:".7rem"}}>
      <Modal
        open={openAdd}
        onOk={closeAdd}
        onCancel={closeAdd}
        closable={false}
        width={700}
        footer={null}
        className="diagnosis-modal"
      >
        <ConfigProvider
          theme={{
            components: {
              Button: {
                defaultColor: "white",
                defaultBg: "#109590",
                defaultGhostColor: "#109590",
              },
              Table: {
                headerBg: "#E0F0F2",
              },
            },
          }}
        >
          <div className="diagnosis-modal-container">
            <div className="diagnosis-modal-header">
              <div className="heading-text">Diagnosis</div>
              <div className="modal-btns">
                <Button ghost onClick={closeAdd}>
                  Cancel
                </Button>
                <Button>Save</Button>
              </div>
            </div>
            <div className="diagnosis-modal-controls">
              {inputValues.map((item, index) => (
                <div className="d-modal-controll" key={index}>
                  {["dx1", "dx2", "dx3", "dx4"].map((dx) => (
                    <div
                      className="diagnosis-edit-container"
                      key={`${dx}-${index}`}
                    >
                      <PlusOutlined style={{ color: "#139696" }} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="container-btn">
              <Button ghost icon={<SearchOutlined />} />
              <Button ghost icon={<PlusOutlined />} />
            </div>
          </div>
        </ConfigProvider>
      </Modal>
      <div
        className="p-md"
        style={{
          border: "1px solid #D7E0E9",
          borderRadius: "10px",
          backgroundColor: "#ffff",
        }}
      >
        <div
          className="desc-buttons"
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#139696",
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          <div className="semibold" style={{ paddingBottom: "24px" }}>
            Diagnosis
          </div>

          <Button
            className="semibold"
            type="primary"
            ghost
            size="small"
            onClick={() => handleOpenAdd()}
          >
            Edit
          </Button>
        </div>
        <div layout="vertical">
            <div >
              <div
                className="semibold"
                style={{
                  color: "#4F566B",
                  fontSize: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBlock: ".5rem",
                }}
              >
                <div>{` DX1 :  ${item.dx1.icdCode}`}</div>
                <div>{`DX2 : ${item.dx2.icdCode}`}</div>
                <div>{`DX3 : ${item.dx3.icdCode}`}</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
