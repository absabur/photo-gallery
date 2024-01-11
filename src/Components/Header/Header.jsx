import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginPage, logout } from "../../Redux/Action/authAction";
import { Modal, ModalBody } from "reactstrap";

const mapStateToProps = (state) => {
  return {
    token: state.loginSignupReducer.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (tf) => dispatch(loginPage(tf)),
    logout: () => dispatch(logout()),
  };
};

const Header = (props) => {
  const [logout, setlogout] = useState(false);
  return (
    <div
      style={{
        background: "black",
        height: "80px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        position: "fixed",
        zIndex:"9"
      }}
    >
      <a
        style={{
          marginLeft: "80px",
          textDecoration: "none",
          color: "white",
          fontSize: "25px",
          fontWeight: "600",
        }}
        href="/"
      >
        Gallery App
      </a>
      <Link style={{ textDecoration: "none", color: "white" }} to="/">
        Home
      </Link>
      {props.token == null ? (
        <p
          onClick={() => props.login(true)}
          style={{ cursor: "pointer", color: "white", margin: "0" }}
        >
          Login
        </p>
      ) : (
        <p
          onClick={() => setlogout(true)}
          style={{ cursor: "pointer", color: "white", margin: "0" }}
        >
          Logout
        </p>
      )}
      <Modal isOpen={logout}>
        <ModalBody>
          <h2>Are you sure you want to logout?</h2>
        </ModalBody>
        <div className="d-flex flex justify-content-center">
          <button
            className="btn btn-dark m-2"
            onClick={() => setlogout(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              props.logout()
              setlogout(false)
            }}
          >
            Logout
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
