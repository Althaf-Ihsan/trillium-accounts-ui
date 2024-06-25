import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Modal, Popconfirm, Switch, Table, Tooltip } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import "./style.css";
import {
  changeStatus,
  deletePatient,
  fetchPatient,
} from "../../Redux/Accounts/accounts.actions";
import { useActionData, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import EditForm from "../Form/EditForm";
import { QuestionAnswerOutlined } from "@mui/icons-material";
const truncateText = (text, length) => {
  if (text !== "" || text !== undefined) {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
  }
};

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const AccountsTable = ({ start, limit }) => {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [localStatus, setLocalStatus] = useState({});
  const {
    patientList,
    deletePatRes,
    PatientSaveRes,
    statusRes,
    patientUpdateRes,
  } = useSelector((state) => state.account);
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const columns = [
    {
      title: "Last Name",
      dataIndex: "lastName",
      render: (text) => (
        <span className="table-item">{truncateText(text, 14)}</span>
      ),
    },
    {
      title: "First Name",
      dataIndex: "FirstName",
      render: (text) => (
        <span className="table-item">{truncateText(text, 14)}</span>
      ),
    },
    {
      title: "DOB",
      dataIndex: "DOB",
      render: (text) => <span className="table-item">{formatDate(text)}</span>,
    },
    {
      title: "MRN",
      dataIndex: "MRN",
      render: (text) => <span className="table-item">{text}</span>,
    },
    {
      title: "Phone No",
      dataIndex: "PhoneNo",
      render: (text) => <span className="table-item">{text}</span>,
    },
    {
      title: "Active",
      dataIndex: "Active",
      render: (text, record) => {
        const isActive =
          localStatus[record.id] !== undefined
            ? localStatus[record.id]
            : text === 1;
        return (
          <span style={{ color: "#A3ACB9", cursor: "pointer" }}>
            <Switch
              checked={isActive}
              size="small"
              onChange={(checked) => handleStatus(record.id, checked)}
            />
          </span>
        );
      },
    },
    {
      title: "Last DOS",
      dataIndex: "DOS",
      render: (text) => <span className="table-item">{formatDate(text)}</span>,
    },
    {
      title: "Facility",
      dataIndex: "Facility",
      render: (text) => (
        <Tooltip title={text}>
          <span className="table-item">{truncateText(text, 18)}</span>
        </Tooltip>
      ),
    },
    {
      title: "Insurance",
      dataIndex: "Insurance",
      render: (text) => <span className="table-item">{text?truncateText(text,14):null}</span>,
    },
    {
      title: "Provider",
      dataIndex: "Provider",
      render: (text) => (
        <span className="table-item">{truncateText(text, 18)}</span>
      ),
    },
    {
      title: "Ins Bal",
      dataIndex: "insBal",
      render: (text) => <span className="table-item">{`${text}.00` ?? "$ 0.00"}</span>,
    },
    {
      title: "Pat Bal",
      dataIndex: "PatBal",
      render: (text) => <span className="table-item">{`${text}.00` ?? "$ 0.00"}</span>,
    },
    {
      title: "Action",
      render: (text, record) => (
        <span style={{ color: "#A3ACB9", cursor: "pointer",display:"flex",gap:'.3rem' }}>
      <EditIcon fontSize="small" onClick={() => handleOpenAdd(record.id)} />
      <LibraryBooksIcon fontSize="small" onClick={()=>handleEdit(record)}/>
      <Popconfirm
        title="Delete the Patient"
        description="Are you sure to delete this patient?"
        placement="topRight"
        onConfirm={() => handleDelete(record.id)}
      >
        <DeleteIcon fontSize="small" />
      </Popconfirm>
    </span>
      ),
    },
  ];
  const handleStatus = async (id, checked) => {
    setLocalStatus((prev) => ({ ...prev, [id]: checked }));

    try {
      await dispatch(changeStatus({ id, status: checked ? 1 : 0 }));
      toast.success(`Patient ${checked ? "Activated" : "Deactivated"}`);
    } catch (error) {
      setLocalStatus((prev) => ({ ...prev, [id]: !checked }));
      toast.error("Failed to update status. Please try again.");
    }
  };

  const fetchData = async () => {
    await dispatch(
      fetchPatient({
        firstName: "",
        lastName: "",
        mrn: "",
        dob: "",
        phone: "",
        providerName: "",
        facility: "",
        status: "",
        start: start,
        limit: limit,
      })
    );
  };

  useEffect(() => {
    fetchData();
  }, [ limit, start]);
  useEffect(
    () => {
      if (patientList && patientList?.data) {
        setData(
          patientList?.data?.results.map((item, index) => ({
            key: index + 1,
            lastName: item.lastName || "",
            FirstName: item.firstName || "",
            DOB: item.dob,
            MRN: item.mrn,
            PhoneNo: item.phone,
            Active: item.active,
            DOS: item.ldos,
            Facility: item.facilityName || "",
            Insurance: item.payorName,
            Provider: item.providerName || "",
            insBal: `$${item.insuranceBalance}`,
            PatBal: `$0`,
            id: item.id,
          }))
        );
      }else{
        setData([])
      }
      
    },
    [patientList,start,limit]

  );

  const closeAdd = () => {
    setOpenAdd(false);
  };
  const handleOpenAdd = (id) => {
    // setFields(defaultFields);
    // setEdit(false);
    setOpenAdd(true);
    setSelectedPatient(id);
  };
  // console.log(data)
  const handleEdit = (record) => {
    const patient=patientList?.data?.results.find((patient)=>patient.id===record.id)
    localStorage.setItem("patient",JSON.stringify(patient))
    navigate("/accounts/edit");
  };
  const handleDelete = (id) => {
    if (id) {
      dispatch(deletePatient(id));
    }
  };
  useEffect(() => {
    // Check if deletePatRes contains valid data before proceeding
    if (deletePatRes?.data?.affectedRows) {
      toast.success("Patient Deleted Successfully");
      fetchData();  // Fetch data after deletion
    }
  }, [deletePatRes]); // Only react to changes in deletePatRes
  
  useEffect(() => {
    
    if (patientUpdateRes?.data) {
      fetchData();  // Fetch data after patient update
    }
  }, [patientUpdateRes]); // Only react to changes in patientUpdateRes
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#139696",
            colorText: "black",
          },
          components: {
            Table: {
              headerBg: "#E0F0F2",
            },
          },
        }}
      >
        <Modal
          centered
          open={openAdd}
          onOk={() => closeAdd()}
          onCancel={() => closeAdd()}
          width={700}
          footer={null}
          closable={false}
        >
          <EditForm selectedPatient={selectedPatient} closeAdd={closeAdd} />
        </Modal>
        <Table
          className="custom-scrollbar"
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          size="small"
          scroll={{ y: "calc(100vh - 200px)" }}
          pagination={false}
        />
      </ConfigProvider>
    </div>
  );
};

export default AccountsTable;






