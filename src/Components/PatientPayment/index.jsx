import React, { useEffect, useState } from "react";
import { Button, Descriptions, Input, Table } from "antd";
import "./style.css";
import { formatDate, parties, types } from "../../Helpers/enums";
import { useDispatch, useSelector } from "react-redux";
import { getledger } from "../../Redux/Payment/payment.actions";

function PatientPayment({item}) {
  const [edit, setEdit] = useState(false);
  const [expand, setExpand] = useState(false);
  const [ledger,setLedger]=useState([])
  const {ledgerRes } = useSelector((state) => state.payment);
  const dispatch=useDispatch()
 
  const columns = [
    {
      title: "Posted",
      dataIndex: "postedDate",
      key: "postedDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Party",
      dataIndex: "party",
      key: "party",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Created",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => formatDate(date),
    },
  ];

useEffect(()=>{
if(item.procedure_Id)
  {
  dispatch(getledger(item.procedure_Id))
  }
},[dispatch])
useEffect(()=>{
  if(ledgerRes.responseCode==0 && ledgerRes.data)
    {
      const mappedData = ledgerRes.data.results.map((item) => ({
        postedDate: item.postedDate,
        type: types.find((type) => type.value === item.type)?.name || item.type,
        party:
          parties.find((party) => party.value === item.party)?.name ||
          item.party,
        amount: item.amount,
        createdDate: item.createdDate,
      }));
      setLedger(mappedData);
    }
},[ledgerRes])
  return (
    <div style={{marginTop:".8rem"}}>
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
            {formatDate(item.dos)}
          </div>
          <div className="semibold" style={{ paddingBottom: "24px" }}>
            Patient Payment
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              ghost
              size="small"
              onClick={() => setExpand(!expand)}
            >
              {expand ? "Collapse" : "Expand"}
            </Button>
            <Button
              type="primary"
              ghost
              size="small"
            
            >
              Edit
            </Button>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",width:"90%"}}>
        {expand
          ? (
            <div key={item.key} style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
            <div
              className="semibold"
              style={{ color: "#4F566B", fontSize: "14px" }}
            >
             <span>Billed: ${item.billed}</span>
            </div>
            <div
            className="semibold"
            style={{ color: "#4F566B", fontSize: "14px" }}
          >
          <span>Adjustment: ${item.adjustment}</span>
          </div>
            <div
              className="semibold"
              style={{ color: "#4F566B", fontSize: "14px" }}
            >
            <span>Paid: ${item.paid}</span>
            </div>
            <div
            className="semibold"
            style={{ color: "#4F566B", fontSize: "14px" }}
          >
          <span>Bal: ${item.balance}</span>
          </div>
          </div>
            )
          :  (
            <div key={item.key} style={{width:"100%",display:"flex",justifyContent:"space-between"}}>
            <div
              className="semibold"
              style={{ color: "#4F566B", fontSize: "14px" }}
            >
             <span>Billed: ${item.billed}</span>
            </div>
            <div
            className="semibold"
            style={{ color: "#4F566B", fontSize: "14px" }}
          >
          <span>Adjustment: ${item.adjustment}</span>
          </div>
            <div
              className="semibold"
              style={{ color: "#4F566B", fontSize: "14px" }}
            >
            <span>Paid: ${item.paid}</span>
            </div>
            <div
            className="semibold"
            style={{ color: "#4F566B", fontSize: "14px" }}
          >
          <span>Bal: ${item.balance}</span>
          </div>
          </div>
            )}</div>
        

        {expand && (
          <div style={{marginTop:".6rem"}}>
            <Table
              className="custom-table"
              columns={columns}
              dataSource={ledger}
              pagination={false}
              bordered
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default PatientPayment;
