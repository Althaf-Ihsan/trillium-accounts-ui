import { DatePicker, Input, Select, Button } from "antd";
import React, { useEffect } from "react";
import "./style.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { insuranceTypes, state } from "../../Helpers/enums";
import { FormValidationSchema } from "../../Helpers/ValidationSchema";
import { useFormik } from "formik";
import { addPatient } from "../../Redux/Accounts/accounts.actions";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const AddForm = ({ closeAdd }) => {
  const clinicId = localStorage.getItem("clinic_id");
  const dispatch = useDispatch();
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      mrn: "",
      phone: "",
      sex: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      policyType: "",
      city: "",
      state: "",
      country: "",
      zip: "",
    },
    validationSchema: FormValidationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("Submitting form with values:", values);
      if (formik.isValid) {
        dispatch(
          addPatient({ ...values, dob: formatDate(values.dob), clinicId })
        );
        toast.success("Patient added successfully");
        resetForm();
        closeAdd();
      } else {
        console.log("Form is invalid:", formik.errors);
      }
    },
  });


  const handleClose = () => {
    formik.resetForm();
    closeAdd();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-header">
          <span className="model-header-title">New Client</span>
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
              className="custom-datepicker"
              allowClear
              onChange={(date) => formik.setFieldValue("dob", date)}
              value={formik.values.dob}
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

export default AddForm;
