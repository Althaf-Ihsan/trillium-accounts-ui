import { Apis } from "../APIs";
import httpCommon from "../http/http.common";

class AccountService {
  fetchPatient(data) {
    console.log(data, "data");
    return httpCommon.get(
      `${Apis.Accounts_Patient}/list/range?dob=${data.dob}&firstName=${data.firstName}&lastName=${data.lastName}&mrn=${data.mrn}&phone=${data.phone}&facilityId=${data.facility}&payorId=&providerId=${data.providerName}&status=${data.status}&start=${data.start}&limit=${data.limit}`,
      {
        data: {},
      }
    );
  }
  fetchByName(data) {
    return httpCommon.get(
      `${Apis.Accounts_Patient}/patient?firstName=${data}&lastName=${data}`,
      {
        data: {},
      }
    );
  }
  deletePatient(credential) {
    return httpCommon.delete(
      `${Apis.Accounts_Patient}/patient/delete/${credential}`,
      {
        data: {},
      }
    );
  }
  addPatient(data) {
    return httpCommon.post(`${Apis.Accounts_Patient}/patient/save`, data);
  }
  updatePatient(data) {
    return httpCommon.patch(
      `${Apis.Accounts_Patient}/patient/update/${data.id}`,
      data
    );
  }
  //change patinet's active status
  changeStatus(data) {
    return httpCommon.patch(
      `${Apis.Accounts_Patient}/patient/status/${data.id}?status=${data.status}`
    );
  }

  //get All patient charges
  getAllCharges(data) {
    return httpCommon.get(`${Apis.Charges_Patient}/visit/icd/${data}`, {
      data: {},
    });
  }
  getAllNotes(data) {
    return httpCommon.get(
      `http://localhost:7002/api/v1/account/note/list/${data}`,
      {
        data: {},
      }
    );
  }
  deleteNotes(data) {
    return httpCommon.delete(
      `http://localhost:7002/api/v1/account/note/delete/${data}`,
      {
        data: {},
      }
    );
  }
  addNotes(data) {
    return httpCommon.post(
      `http://localhost:7002/api/v1/account/note/add`,
      data
    );
  }
  addFiles(data) {
    console.log("haiiiiiiiiiiiiiii");
    return httpCommon.post(
      `http://localhost:7005/api/v1/account/patient/files/upload`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }
  getFiles(data) {
    return httpCommon.get(
      `http://localhost:7005/api/v1/account/patient/files/${data}`
    );
  }
  deleteFiles(data) {
    return httpCommon.delete(
      `http://localhost:7005/api/v1/account/patient/files/delete/${data}`,
      data
    );
  }
}
export default new AccountService();
