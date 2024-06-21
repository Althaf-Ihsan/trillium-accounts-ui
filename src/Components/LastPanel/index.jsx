import React from 'react';
import { Tabs } from 'antd';
import './style.css';
import Notes from './Notes';
import Files from './Files';

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: (
      <div style={{ fontSize: "16px", fontWeight: "500", borderRadius: "20px" }}>
        {`Notes`}
      </div>
    ),
    children: (
      <div className="tab-content scrollbarY--custom">
        <Notes />
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div style={{ fontSize: "16px", fontWeight: "500", borderRadius: "20px" }}>
        {`Files`}
      </div>
    ),
    children: (
      <div className="tab-content scrollbarY--custom">
        <Files />
      </div>
    ),
  },
];

const LastPanel = () => (
  <Tabs size="small" onChange={onChange} type="card" items={items}></Tabs>
);

export default LastPanel;
