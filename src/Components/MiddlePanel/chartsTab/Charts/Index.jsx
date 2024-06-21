import React, { useState } from "react";
import { Button, Descriptions } from "antd";
import "./style.css";

function PatientCharts() {
  const [expand, setExpand] = useState(false);

  return (
    <div>
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
          <div style={{ paddingBottom: "24px" }}>11/18/13</div>
          <div style={{ paddingBottom: "24px" }}>Aligeti MD</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              ghost
              size="small"
              onClick={() => setExpand(!expand)}
            >
              {expand ? "Collapse" : "Expand"}
            </Button>
            <Button type="primary" ghost size="small">
              Edit
            </Button>
          </div>
        </div>

        <Descriptions layout="vertical">
          {expand ? (
            <Descriptions.Item>
              <div
                // className={edit ? "semibold edit_input" : "semibold"}
                style={{
                  color: " #4F566B",
                  fontSize: "14px",
                  //   fontWeight: "400px",
                  textAlign: "justify",
                }}
              >
                Subjective: Patient reports that he is feeling ‘tired’ and he
                cant seem to get out of bed in the morning. Objective: Patient
                appears to be tired. He is pale in complexion and has large
                circles under his eyes. Assessment: No visible signs of
                distress. Patient appears to be undress considerable strain from
                his family. Signs of depression. Depressive disorder, recurrent,
                severe F33.1 (ICD 10) Plan: 1. Take Vitamin D, once daily, oral
                2. Outdoor activity - walk each evening for 30 mins
              </div>
            </Descriptions.Item>
          ) : (
            <Descriptions.Item>
              <div
                className="semibold"
                style={{
                  color: " #4F566B",
                  fontSize: "14px",
                  fontWeight: "300px",
                  textAlign: "justify",
                }}
              >
                Chief Complaint: Shortness of breath 52 year old caucasian male
                presenting with shortness of breath. Patient complains he has
                been experiencing for ...
              </div>
            </Descriptions.Item>
          )}
        </Descriptions>

        {expand && <div></div>}
      </div>
    </div>
  );
}
export default PatientCharts;
