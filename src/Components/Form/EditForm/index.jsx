import { DatePicker, Input, Select, Button } from "antd";
import React, { useEffect } from "react";
import "./style.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { insuranceTypes, state } from "../../../Helpers/enums";
import { useFormik } from "formik";
import { updatePatient } from "../../../Redux/Accounts/accounts.actions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectPatientById } from "../../../Redux/Accounts/acccounts.reducer";
import moment from "moment";
const EditForm = ({ closeAdd, selectedPatient }) => {
  const dispatch = useDispatch();
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const patient = useSelector(selectPatientById(selectedPatient));
  console.log(patient);
  const formik = useFormik({
    initialValues: {
      ...patient,
      dob:
        patient && patient.dob ? moment(patient.dob).format("YYYY-MM-DD") : "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("Submitting form with values:", values);
      if (formik.isValid) {
        const updatedValues = {
          ...values,
          selectedPatient,
        };
        if (values.dob) {
          updatedValues.dob = formatDate(values.dob);
        }

        dispatch(updatePatient(updatedValues));
        toast.success("Patient updated Successfully");
        resetForm();
        closeAdd();
      } else {
        console.log("Form is invalid:", formik.errors);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm({ values: patient });
    closeAdd();
  };
  useEffect(() => {
    if (patient) {
      formik.resetForm({ values: patient });
    }
  }, [patient]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-header">
          <span className="model-header-title">Edit Client</span>
          <div className="form-actions">
            <Button size="medium" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </div>
        <div className="modal-grid">
          {[
            { name: "firstName", placeholder: "First Name" },
            { name: "lastName", placeholder: "Last Name" },
            { name: "middleName", placeholder: "Middle Name" },
            { name: "phone", placeholder: "Phone" },
            { name: "email", placeholder: "Email" },
            { name: "mrn", placeholder: "MRN" },
            { name: "addressLine1", placeholder: "Address Line 1" },
            { name: "addressLine2", placeholder: "Address Line 2" },
            { name: "zip", placeholder: "Zipcode" },
            { name: "city", placeholder: "City" },
          ].map(({ name, placeholder }) => (
            <div className="form-field" key={name}>
              <Input
                placeholder={placeholder}
                name={name}
                value={formik.values[name]}
                size="large"
                className="modal-grid-buttons custom-placeholder-color"
                allowClear
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[name] && formik.errors[name] && (
                <span className="error">{formik.errors[name]}</span>
              )}
            </div>
          ))}
          <div className="form-field">
            <DatePicker
              name="dob"
              placeholder="DOB"
              size="large"
              // value={formik.values.dob}
              className="custom-datepicker"
              allowClear
              onChange={(date) => formik.setFieldValue("dob", date)}
              value={formik.values.dob ? moment(formik.values.dob) : null}
              onBlur={formik.handleBlur}
              suffixIcon={<CalendarMonthIcon />}
            />
            {formik.touched.dob && formik.errors.dob && (
              <span className="error">{formik.errors.dob}</span>
            )}
          </div>
          <div className="form-field">
            <Select
              placeholder="Select gender"
              name="sex"
              size="large"
              value={formik.values.sex || undefined}
              allowClear
              options={[
                { value: 1, label: "Male" },
                { value: 2, label: "Female" },
              ]}
              onChange={(value) => formik.setFieldValue("sex", value)}
              className="modal-grid-buttons custom-placeholder-color"
            />
            {formik.touched.sex && formik.errors.sex && (
              <span className="error">{formik.errors.sex}</span>
            )}
          </div>
          <div className="form-field">
            <Select
              name="policyType"
              placeholder="Policy Type"
              size="large"
              className="modal-grid-buttons custom-placeholder-color"
              allowClear
              value={formik.values.policyType || undefined}
              onChange={(value) => formik.setFieldValue("policyType", value)}
              options={insuranceTypes.map((item) => {
                return { value: item.value, label: item.label };
              })}
            />
            {formik.touched.policyType && formik.errors.policyType && (
              <span className="error">{formik.errors.policyType}</span>
            )}
          </div>
          <div className="form-field">
            <Select
              placeholder="State"
              name="state"
              size="large"
              value={formik.values.state || undefined}
              onChange={(value) => formik.setFieldValue("state", value)}
              options={state.map((item) => {
                return { value: item.value, label: item.value };
              })}
              className="modal-grid-buttons custom-placeholder-color"
              allowClear
            />
            {formik.touched.state && formik.errors.state && (
              <span className="error">{formik.errors.state}</span>
            )}
          </div>
          <div className="form-field">
            <Select
              name="country"
              placeholder="Country"
              size="large"
              value={formik.values.country || undefined}
              onChange={(value) => formik.setFieldValue("country", value)}
              options={[
                { value: "USA", label: "USA" },
                { value: "US", label: "US" },
                { value: "MX", label: "MX" },
              ]}
              className="modal-grid-buttons custom-placeholder-color"
              allowClear
            />
            {formik.touched.country && formik.errors.country && (
              <span className="error">{formik.errors.country}</span>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default EditForm;
