import React, { useState } from "react";
import { connect } from "react-redux";
import { loginSignup } from "../../Redux/Action/authAction";
import { ErrorMessage, Formik } from "formik";
const mapDispatchToProps = (dispatch) => {
  return {
    loginSignup: (email, password, type) =>
      dispatch(loginSignup(email, password, type)),
  };
};

const LoginSignup = (props) => {
  const [mode, setmode] = useState("log-in");
  const handleMode = () => {
    setmode(mode => mode === "sign-up" ? "log-in" : "sign-up");
  };
  return (
    <div>
      <Formik
        onSubmit={(values) =>
          props.loginSignup(values.email, values.password, mode)
        }
        initialValues={{
          // name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
          }

          if (mode === "sign-up") {
            if (!values.confirmPassword) {
              errors.confirmPassword = "Required";
            } else if (values.password !== values.confirmPassword) {
              errors.confirmPassword =
                "Password and Confirm Password did not match";
            }
          }

          return errors;
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <div className="p-4" style={{ boxShadow: "0 0 5px black" }}>
            <div style={{ textAlign: "center" }}>
              {mode === "sign-up"
                ? "Already have an account?"
                : "Don't have an account?"}
              <button
                onClick={handleMode}
                style={{
                  marginLeft: "5px",
                  backgroundColor: "tomato",
                  color: "white",
                }}
                className="btn"
              >
                {mode === "sign-up" ? "Log In" : "Sign Up"}
              </button>
            </div>
            <h1 style={{ textAlign: "center", margin: "1rem" }}>
              {mode === "sign-up" ? "Sign Up" : "Log In"}
            </h1>
            <form className="form" onSubmit={handleSubmit}>
              <label>Email: </label>{" "}
              <ErrorMessage name="email" component="span" />
              <input
                onChange={handleChange}
                value={values.email}
                className="form-control mb-4"
                type="text"
                name="email"
                placeholder="Enter Email"
              />
              <label>Password: </label>{" "}
              <ErrorMessage name="password" component="span" />
              <input
                onChange={handleChange}
                value={values.password}
                className="form-control mb-4"
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {mode === "sign-up" ? (
                <>
                  <label>Confirm Password: </label>{" "}
                  <ErrorMessage name="confirmPassword" component="span" />
                  <input
                    onChange={handleChange}
                    value={values.confirmPassword}
                    className="form-control mb-4"
                    type="password"
                    name="confirmPassword"
                    placeholder="Enter Password Again"
                  />
                </>
              ) : null}
              <button
                style={{ width: "100%" }}
                className="btn btn-success"
                type="submit"
              >
                {mode === "sign-up" ? "Sign Up" : "Log In"}
              </button>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LoginSignup);
