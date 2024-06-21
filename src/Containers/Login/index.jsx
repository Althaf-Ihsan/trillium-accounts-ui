import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { IconButton, TextField } from "@mui/material";
import { Button, Typography } from "antd";
import EditIcon from "@mui/icons-material/Edit";
import trilliumHealthLogo from "../../assets/images/trillium-health-logo.png";
import clinicLoginCover1x from "../../assets/images/clinic-login-cover1x.png";
import clinicLoginCover1_5x from "../../assets/images/clinic-login-cover1_5x.png";
import clinicLoginCover2x from "../../assets/images/clinic-login-cover2x.png";
import validationSchema from "../../Helpers/ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { clickLogin, getuserData } from "../../Redux/Login/login.actions";
import { LoginResponse, apiStatus } from "../../Redux/Login/login.reducer";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginError, setloginError] = useState("");
  const [status, setstatus] = useState("default");
  const { userdata, loginResponse, Status } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      clinic_name: "",
      clinicId: 93422,
      userName: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
        let a = { name: values.clinic_name, id: values.clinicId };
        localStorage.setItem("clinic_data", JSON.stringify(a));
        localStorage.setItem("clinic_id", values.clinicId);
      dispatch(
        clickLogin({
          clinicId: values.clinicId,
          userName: values.userName,
          password: values.password,
        })
      );
      dispatch(apiStatus(true));
    },
  });

  const newlogin = () => {
    formik.resetForm();
    setstatus("not");
  };
  //login response
  useEffect(() => {
    if (loginResponse && loginResponse.data) {
      const { data } = loginResponse;
      // console.log(loginResponse);
      // console.log(data);
      let responseCode = loginResponse?.responseCode;
      if (data && responseCode === 0) {
        localStorage.setItem("access_token", data?.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);

        // api calls
        dispatch(LoginResponse(null));
        navigate("/accounts");
      }
      if (responseCode === 117) {
        setloginError("Login failed. Please enter valid credentials");
      }
      if (responseCode === 159) {
        setloginError(
          "We are working to ensure your account is activated. Due to demand, this is taking longer than we anticipated. We will reach out to you as soon as possible to verify your information and activate the account. Thank you for your patience"
        );
      }
    }
  }, [loginResponse,navigate]);

  // useEffect(() => {
  //   if (Status === true) {
  //     if (userdata && userdata.data) {
  //       const { data } = userdata;
  //       // let userx = data.memoryCash.userList ? data.memoryCash.userList : []
  //       let userx = [...(data.memoryCash.userList || [])];

  //       userx.push({
  //         userId: 0,
  //         roleId: 101,
  //         roleName: "INTERNAL_SUPPORT",
  //         firstName: "Internal",
  //         middleName: "",
  //         lastName: "Support",
  //         fullName: "Internal Support",
  //         clinicId: 0,
  //         clinicName: "",
  //       });
  //       let memoryCash = {
  //         appointmentType: data.memoryCash.appointmentType
  //           ? data.memoryCash.appointmentType
  //           : [],
  //         locations: data.memoryCash.locations ? data.memoryCash.locations : [],
  //         permissionEntity: data.memoryCash.permissionEntity
  //           ? data.memoryCash.permissionEntity
  //           : [],
  //         provider: data.memoryCash.provider ? data.memoryCash.provider : [],
  //         userList: userx,
  //         posList: data.memoryCash.posList,
  //         tosList: data.memoryCash.tosList,
  //       };
  //       localStorage.setItem("memoryCash", JSON.stringify(memoryCash));
  //       localStorage.setItem("user_data", JSON.stringify(data.loginInfo));
  //     }
  //   }
  // }, [userdata]);

  return (
    <div className="clinicLogin">
      <header className="clinicLogin__header">
        <div className="clinicLogin__header__bar">
          <a href="#0">
            <img
              src={trilliumHealthLogo}
              alt="trillium-health-logo"
              className="clinicLogin__header__logo"
            />
          </a>

          <ul>
            <li>
              <a href="#0">About</a>
            </li>
            <li>
              <a href="#0">Contact us</a>
            </li>
          </ul>
        </div>
      </header>

      <main className="clinicLogin__main">
        <section className="clinicLogin__section">
          <div className="clinicLogin__grid">
            <div className="clinicLogin__grid__col">
              <h1 className="clinicLogin__grid__heading">
                The All-In-One Application for Physicians.
              </h1>
              <h2 className="clinicLogin__grid__subheading">
                Schedule appointments, virtually visit and securely chat with
                your patients - All in a single platform.
              </h2>
              <div className="clinicLogin__heroWrapper">
                <img
                  alt="logincoverpicture"
                  src={clinicLoginCover1x}
                  srcSet={`${clinicLoginCover1x} 300w, ${clinicLoginCover1_5x} 768w, ${clinicLoginCover2x} 1280w, ${clinicLoginCover2x} 3200w`}
                  className="clinicLogin__heroImg"
                />
              </div>
            </div>

            <div className="clinicLogin__grid__col clinicLogin__grid__col--form">
              <form
                className="clinicLogin__form"
                onSubmit={formik.handleSubmit}
              >
                <div
                  hidden={status === "default" ? false : true}
                  className="clinicLogin__editableInputField"
                >
                  <TextField
                    margin="normal"
                    autoFocus
                    type="text"
                    label="Clinic Name"
                    variant="outlined"
                    className="clinicLogin__inputField"
                    name="clinic_name"
                    value={formik.values.clinic_name}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.clinic_name &&
                      Boolean(formik.errors.clinic_name)
                    }
                    helperText={
                      formik.touched.clinic_name && formik.errors.clinic_name
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "",
                        },
                        "&:hover fieldset": {
                          borderColor: "#139696",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#139696",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "#139696",
                        },
                      },
                    }}
                  />

                  <div className="clinicLogin__editBtn--wrapper">
                    <IconButton onClick={newlogin}>
                      <EditIcon />
                    </IconButton>
                  </div>
                </div>

                <div hidden={status === "default" ? true : false}>
                  <div className="clinicLogin__editableInputField">
                    <TextField
                      margin="normal"
                      autoFocus
                      type="text"
                      label="Clinic Name"
                      variant="outlined"
                      className="clinicLogin__inputField"
                      name="clinic_name"
                      value={formik.values.clinic_name}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.clinic_name &&
                        Boolean(formik.errors.clinic_name)
                      }
                      helperText={
                        formik.touched.clinic_name && formik.errors.clinic_name
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "",
                          },
                          "&:hover fieldset": {
                            borderColor: "#139696",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#139696",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          "&.Mui-focused": {
                            color: "#139696",
                          },
                        },
                      }}
                    />
                  </div>
                  <TextField
                    margin="normal"
                    required
                    variant="outlined"
                    type="number"
                    label="Clinic ID"
                    className="clinicLogin__inputField"
                    name="clinicId"
                    value={formik.values.clinicId}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.clinicId && Boolean(formik.errors.clinicId)
                    }
                    helperText={
                      formik.touched.clinicId && formik.errors.clinicId
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "",
                        },
                        "&:hover fieldset": {
                          borderColor: "#139696",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#139696",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        "&.Mui-focused": {
                          color: "#139696",
                        },
                      },
                    }}
                  />
                </div>

                <TextField
                  margin="normal"
                  required
                  autoComplete="email"
                  label="Username"
                  type="text"
                  variant="outlined"
                  className="clinicLogin__inputField"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "",
                      },
                      "&:hover fieldset": {
                        borderColor: "#139696",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#139696",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#139696",
                      },
                    },
                  }}
                />

                <TextField
                  margin="normal"
                  required
                  type="password"
                  label="Password"
                  variant="outlined"
                  className="clinicLogin__inputField"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "",
                      },
                      "&:hover fieldset": {
                        borderColor: "#139696",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#139696",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      "&.Mui-focused": {
                        color: "#139696",
                      },
                    },
                  }}
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="clinicLogin__submitBtn"
                  onClick={formik.handleSubmit}
                >
                  Login
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <div className="clinicLogin__copyright">
        <Typography
          variant="caption"
          align="center"
          color="textSecondary"
          display="block"
        >
          Copyright &copy; {new Date().getFullYear()}-
          {new Date().getFullYear() + 1} trillium.health
        </Typography>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default LoginForm;
