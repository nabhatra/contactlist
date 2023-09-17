import { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [formValue, setFormvalue] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword } = formValue;
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const handleChange = (e: any) => {
    setFormvalue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill all Input field");
    }
  };

  const handleRegister = async () => {
    if (firstName && lastName && password && email) {
      await registerUser({ firstName, lastName, email, password });
    }
    if (password !== confirmPassword) {
      return toast.error("Password don't match");
    } else {
      toast.error("Please fill all Input field");
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User Login Successfully");
      dispatch(
        setUser({ name: loginData.result.name, token: loginData.token })
      );
      navigate("/dashboard");
    }

    if (isRegisterSuccess) {
      toast.success("User Register Successfully");
      dispatch(
        setUser({ name: registerData.result.name, token: registerData.token })
      );
      navigate("/dashboard");
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.message);
    }
    if (isRegisterError) {
      toast.error((registerError as any).data.message);
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="colo-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw bold mb-2 text-uppercase">
                    {!showRegister ? "Login" : "Register"}
                  </h2>
                  <p className="text-white-50 mb-4">
                    {!showRegister
                      ? "Please enter your Email & Password"
                      : "Please enter User detail"}
                  </p>
                  {showRegister && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="firstName"
                          value={firstName}
                          onChange={handleChange}
                          label="First Name"
                          className="form-control form-control-lg"
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="lastName"
                          value={lastName}
                          onChange={handleChange}
                          label="Last Name"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      label="Email"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Password"
                      className="form-control form-control-lg"
                    />
                  </div>
                  {showRegister && (
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        label="Confirm Password"
                        className="form-control form-control-lg"
                      />
                    </div>
                  )}
                  <div>
                    {!showRegister ? (
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="button"
                        onClick={() => handleLogin()}
                      >
                        Login
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="button"
                        onClick={() => handleRegister()}
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h5 className="md-0">
                    {!showRegister ? (
                      <>
                        Don't have an account ?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(true)}
                        >
                          Sign up
                        </p>
                      </>
                    ) : (
                      <>
                        Already have an account ?
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => setShowRegister(false)}
                        >
                          Sign in
                        </p>
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
