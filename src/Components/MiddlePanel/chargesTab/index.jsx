import React, { useEffect, useState } from 'react'
import PatientClaims from './PatientClaims'
import { getAllCharges } from '../../../Redux/Accounts/accounts.actions';
import { useDispatch, useSelector } from 'react-redux';
import { Descriptions } from 'antd';
const ChargesTab = () => {
  const [charges,setCharges]=useState([])
  const { chargeList } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  useEffect(() => {
    const patientData = JSON.parse(localStorage.getItem("patient"));
    if (patientData && patientData.id) {
      dispatch(getAllCharges(patientData.id));
    }
  }, [dispatch]);
  useEffect(()=>{
    if(chargeList.responseCode==0 && chargeList)
      setCharges(chargeList.data)
  })
  console.log(chargeList.data)
    return (
    <div>
    <Descriptions></Descriptions>
    {charges.map((item,index)=>{
     return  <PatientClaims item={item} key={index}/>
    })}
     
    </div>
  )
}

export default ChargesTab
