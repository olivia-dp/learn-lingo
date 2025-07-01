import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../../schemas/schemas";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeLogInModal } from "../../redux/modal/slice";
import s from "./LoginModal.module.css";
import { loginUser } from "../../firebase/auth/auth";
import { IoMdClose } from "react-icons/io";


const LoginModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password);
      dispatch(closeLogInModal());
      navigate("/teachers");
    } catch (error) {
      setFirebaseError(error.message);
    }
  };

  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={() => dispatch(closeLogInModal())}>
        <IoMdClose />
        </button>
        <h2 className={s.title}>Log In</h2>
        <p className={s.subtitle}>
          Welcome back! Please enter your credentials to access your account.
        </p>
        {firebaseError && <p className={s.firebaseError}>{firebaseError}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
          <div className={s.inputGroup}>
            <input
              {...register("email")}
              className={s.input}
              placeholder="Email"
              autoComplete="email"
            />
            {errors.email && <p className={s.error}>{errors.email.message}</p>}
          </div>

          <div className={s.inputGroup}>
            <div className={s.passwordWrapper}>
              <input
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                className={s.input}
                placeholder="Password"
                autoComplete="current-password"
              />
              <svg className={s.eyeIcon} onClick={() => setPasswordVisible(!passwordVisible)}>
                <use href={`/symbol-defs.svg#${passwordVisible ? "icon-eye" : "icon-eye-blocked"}`} />
              </svg>
            </div>
            {errors.password && <p className={s.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={s.submitBtn}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
