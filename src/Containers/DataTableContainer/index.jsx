import React, { useEffect, useState } from "react";
import MainHeader from "../../Components/MainHeader";
import {
  Button,
  DatePicker,
  Input,
  Pagination,
  Popover,
  Select,
  Dropdown,
  Modal,
  AutoComplete,
} from "antd";
import PolylineIcon from "@mui/icons-material/Polyline";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import "./style.css";
import AccountsTable from "../../Components/AccountsTable";
import { facility, provider } from "../../Helpers/enums";
import {
  fetchByName,
  fetchPatient,
} from "../../Redux/Accounts/accounts.actions";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "../../Components/Form";
function DataTableContainer() {
  const dispatch = useDispatch();
  const { Search } = Input;
  const { patientDetail } = useSelector((state) => state.account);
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [limit, setLimit] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const start = (currentPage - 1) * limit;
  const { patientList } = useSelector((state) => state.account);
  const [options, setOptions] = useState([]);
  const [filterData, setFilterData] = useState({
    firstName: "",
    lastName: "",
    mrn: "",
    dob: "",
    phone: "",
    providerName: "",
    facility: "",
    status: "",
    start: "",
    limit: "",
  });
  const handleOpenAdd = () => {
    // setFields(defaultFields);
    // setEdit(false);
    setOpenAdd(true);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const closeAdd = () => {
    setOpenAdd(false);
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    if (pageSize) {
      setLimit(pageSize);
    }
  };
  const handleInputValue = (e) => {
    const { title, value } = e.target;
       setFilterData((prev) => ({ ...prev, [title]: value }));
  };

  const handleDateValue = (dateString, title) => {
    if (dateString) {
      const formattedDate = dateString.format("YYYY-MM-DD");
        setFilterData((prev) => ({ ...prev, [title]: formattedDate }));
    }
  };

  const handleSelectValue = (value, title) => {
       setFilterData((prev) => ({ ...prev, [title]: value }));
  };
  const handlePopSearch = () => {
    dispatch(
      fetchPatient({
        firstName: filterData.firstName,
        lastName: filterData.lastName,
        mrn: filterData.mrn,
        dob: filterData.dob,
        phone: filterData.phone,
        providerName: filterData.providerName,
        facility: filterData.facility,
        status: filterData.status,
        start: start,
        limit: limit,
      })
    );
    handleOpenChange();
  };
  const FilterPopover = (
    <div style={{ display: "flex", gap: "16px" }}>
      <Input
        className="custom-select"
        title="firstName"
        placeholder="First Name"
        style={{ width: "150px" }}
        allowClear
        popupmatchselectwidth="false"
        onChange={handleInputValue}
      />
      <Input
        className="custom-select"
        title="lastName"
        placeholder="Last Name"
        style={{ width: "150px" }}
        allowClear
        popupmatchselectwidth="false"
        onChange={handleInputValue}
      />
      <Input
        className="custom-select"
        title="mrn"
        placeholder="MRN"
        style={{ width: "120px" }}
        allowClear
        popupmatchselectwidth="false"
        onChange={handleInputValue}
      />
      <DatePicker
        placeholder="DOB"
        title="dob"
        className="custom-select"
        format="MM-DD-YYYY"
        onChange={(dateString) => handleDateValue(dateString, "dob")}
      />

      <Input
        className="custom-select"
        title="phone"
        placeholder="Phone No"
        style={{ width: "180px" }}
        allowClear
        onChange={handleInputValue}
        popupmatchselectwidth="false"
      />
      <Select
        className="custom-select"
        placeholder="Provider"
        style={{ width: "150px" }}
        allowClear
        popupmatchselectwidth="false"
        onChange={(value) =>
          handleSelectValue(value == undefined ? "" : value, "providerName")
        }
        options={provider.map((item) => {
          return { value: item.fullName, label: item.fullName };
        })}
      />
      <Select
        title="facility"
        className="custom-select"
        placeholder="Facility"
        style={{ width: "180px" }}
        allowClear
        popupmatchselectwidth="false"
        onChange={(value) =>
          handleSelectValue(value == undefined ? "" : value, "facility")
        }
        options={facility.map((item) => {
          return { value: item.locationName, label: item.locationName };
        })}
      />
      <Select
        title="status"
        className="custom-select"
        placeholder="Status"
        style={{ width: "100px" }}
        allowClear
        popupmatchselectwidth="false"
        onChange={(value) =>
          handleSelectValue(value == undefined ? "" : value, "status")
        }
        options={[
          { value: 1, label: "Active" },
          { value: 0, label: "Inactive" },
        ]}
      />

      <Button ghost className="rounded-md" type="primary" size="medium" onChange={handleOpenChange}>
        Clear
      </Button>
      <Button
        type="primary"
        size="medium"
        className="rounded-md"
        onClick={handlePopSearch}
      >
        Search
      </Button>
    </div>
  );

  const Ditems = [
    {
      label: (
        <span>
          <input type="checkbox" className="custom-checkbox" />
          Location
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span>
          <input type="checkbox" className="custom-checkbox" /> Patient
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span>
          <input type="checkbox" className="custom-checkbox" /> Billed amount
        </span>
      ),
      key: "3",
    },
    {
      label: (
        <span>
          <input type="checkbox" className="custom-checkbox" /> Ins amount
        </span>
      ),
      key: "4",
    },
  ];
  const handleSearch = (value) => {
    console.log(value, "valie");
    dispatch(fetchByName(value));
  };
  useEffect(() => {
    if (patientDetail?.data?.results) {
      const newOptions = patientDetail.data.results.map((item, index) => ({
        label: `${item.firstName} ${item.lastName}`,
        value: `${item.firstName} ${item.lastName}`,
        key: `${item.firstName} ${item.lastName}-${index}`,
      }));
      setOptions(newOptions);
    }
  }, [patientDetail]);
console.log(filterData,"filterData")
  useEffect(() => {}, [patientList]);
  return (
    <div>
      <Modal
        centered
        open={openAdd}
        onOk={() => closeAdd()}
        onCancel={() => closeAdd()}
        width={700}
        footer={null}
        closable={false}
      ><AddForm closeAdd={closeAdd}/>
      </Modal>
      <MainHeader />
      {/* Claims middle section start */}
      <div
        className="flex-center flex-space-between"
        style={{
          alignItems: "center",
          paddingInline: "4rem",
          marginBlock: "1rem",
        }}
      >
        <div>
          <Pagination
            size="small"
            total={50}
            current={currentPage}
            defaultPageSize={limit}
            showQuickJumper
            showSizeChanger
            pageSizeOptions={["100", "200", "300", "500","1000"]}
            onChange={handlePageChange}
            onShowSizeChange={handlePageChange}
          />
        </div>
        <div className="flex-space-between flex">
          <div className="claim-status-open claim-status-box">
            Open
            <span>112</span>
          </div>
          <div className="claim-status-priority claim-status-box">
            Priority <span>58</span>
          </div>
          <div className="claim-status-overdue claim-status-box">
            Overdue <span>18</span>
          </div>
        </div>
        <div className="search-bar flex-space-between">
          <AutoComplete
            style={{ width: "320px" }}
            onSearch={handleSearch}
            options={options}
          >
            <Search
              size=""
              style={{ width: "320px" }}
              placeholder="Search ..."
              allowClear
            />
          </AutoComplete>

          <Popover
            placement="bottomRight"
            content={FilterPopover}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button type="primary" ghost size="medium" className="flex-center">
              <PolylineIcon style={{ fontSize: "14px", marginRight: "2px" }} />
              <span className="bold">Filters</span>
            </Button>
          </Popover>

          <Dropdown menu={{ items: Ditems }}>
            <Button type="primary" ghost size="medium" className="flex-center">
              <FilterListIcon
                style={{ fontSize: "16px", marginRight: "2px" }}
              />
              <span className="bold">Sort</span>
            </Button>
          </Dropdown>

          <Button
            type="primary"
            shape="circle"
            size="medium"
            onClick={() => handleOpenAdd()}
            icon={<AddIcon />}
          />
        </div>
      </div>
      {/* Claims middle section end */}

      <div style={{ paddingInline: "2rem", marginBlock: "1rem" }}>
        <AccountsTable start={start} limit={limit} currentPage={currentPage} />
      </div>
    </div>
  );
}

export default DataTableContainer;
