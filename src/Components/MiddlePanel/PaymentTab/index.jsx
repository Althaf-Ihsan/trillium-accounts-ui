import React, { useEffect, useState } from "react";
import PatientPayment from "../../PatientPayment";
import { getPayment } from "../../../Redux/Payment/payment.actions";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions } from "antd";
const PaymentTab = () => {
  const [paymentData, setPaymentData] = useState([]);
  const { paymentRes,ledgerRes } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData && patientData.id) {
      dispatch(getPayment(patientData.id));
    }
  }, [dispatch]);
  useEffect(() => {
    if (paymentRes?.responseCode === 0 && paymentRes.data) {
        setPaymentData(paymentRes.data.results)
      }
  }, [paymentRes]);
    return (
    <div>
    <Descriptions ></Descriptions>
    {paymentData.map((item,index)=>{
        return   <PatientPayment item={item} key={index}/>
    })}
    
    </div>
  );
};

export default PaymentTab;
