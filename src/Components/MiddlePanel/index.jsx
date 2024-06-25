import React from 'react';
import { Tabs } from 'antd';
import './style.css';
import ChargesTab from './chargesTab';
import PatientPayment from '../PatientPayment';
import PaymentTab from './PaymentTab';
import PatientCharts from './chartsTab/Charts/Index';
import ChartsTab from './chartsTab';
const onChange = (key) => {
  console.log(key);
};

const items=[
  {
    key:"1",
    label: (<div style={{fontSize:"16px",fontWeight:"500",borderRadius:"20px"}}>{`Charges`}</div>),
    children: <div className="tab-content scrollbarY--custom">
    <ChargesTab/>
    </div>,
  },
  {
    key:"2",
     label: (<div style={{fontSize:"16px",fontWeight:"500",borderRadius:"20px"}}>{`Payments`}</div>),
     children: <div className="tab-content scrollbarY--custom">
   <PaymentTab/>
     </div>,
  },
  {
    key:"3",
     label: (<div style={{fontSize:"16px",fontWeight:"500",borderRadius:"20px"}}>{`Charts`}</div>),
     children: <div className="tab-content scrollbarY--custom">
    <ChartsTab/>
     </div>,
  },
  // {
  //   key:"3",
  //   title:"Charts"
  // },
  // {
  //   key:"4",
  //   title:"Files"
  // },
  // {
  //   key:"5",
  //   title:"Messages"
  // }
]
const MiddlePanel = () => (
  <Tabs
    size='small'
    onChange={onChange}
    type="card"
    items={items}
   
  />
);

export default MiddlePanel;
