import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Descriptions, Upload, message } from "antd";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { useDispatch, useSelector } from "react-redux";
import { getFiles,addFiles,deleteFiles } from "../../../Redux/Accounts/accounts.actions";

function Files() {
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { filesDataRes } = useSelector((state) => state.account);
  const patientData = JSON.parse(localStorage.getItem('patient'));
  console.log(filesDataRes,"fileDATA")
  useEffect(() => {
    if (patientData && patientData.id) {
      dispatch(getFiles(patientData.id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (filesDataRes) {
        console.log("entered")
      setFiles(
        Object.entries(filesDataRes).map((file, index) => ({
          uid: file[1].imageId,
          name: file[1].fileName,
          status: "done",
          url: file[1].filePath,
          thumbUrl: file[1].filePath,
        }))
      );
    }
  }, [filesDataRes]);
console.log(files,"file")
  // Handle file upload
  const handleUpload = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "patientId",
      patientData.id
    );
    formData.append("clinicId", localStorage.getItem("clinic_id"));
    formData.append("fileType", file.type);
    formData.append("imageTitle", file.name);
    formData.append("imageNotes", file.name);

    dispatch(addFiles(formData))
      .then((response) => {
        console.log(response, "file");
        if (response.payload.responseCode === 0) {
          message.success(`${file.name} file uploaded successfully.`);
          onSuccess(response.data);
          dispatch(getFiles(patientData.id));
        } else {
          message.error(`${file.name} file upload failed.`);
          onError(new Error("Upload failed"));
        }
      })
      .catch((error) => {
        message.error(`${file.name} file upload failed.`);
        onError(error);
      });
  };

  // Handle file removal
  const handleRemove = (file) => {
    console.log(file,"inside file")
    const fileId = file.uid;
    dispatch(deleteFiles(fileId))
      .then((response) => {
        if (response.payload.responseCode === 0) {
          message.success(`${file.name} file deleted successfully.`);
          setFiles((prevFiles) =>
            prevFiles.filter((item) => item.uid !== fileId)
          );
          dispatch(getFiles(patientData.id));
        } else {
          message.error(`${file.name} file deletion failed.`);
        }
      })
      .catch((error) => {
        // console.log(error);
        message.error(`${file.name} file deletion failed.`);
      });
  };
  return (
    <div className="files-container">
      <Descriptions></Descriptions>
      <div className="files-heading">Files</div>
      <div className="file-display">
        <Upload
          customRequest={handleUpload}
          onRemove={handleRemove}
          listType="picture"
          fileList={[...files]}
          className="upload-list-inline"
        >
          <Button className="upload-btn" icon={<CloudUploadRoundedIcon />}>
            Upload
          </Button>
        </Upload>
      </div>
    </div>
  );
}

export default Files;
