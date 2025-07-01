import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../firebase/auth/auth";
import { registerSchema } from "../../schemas/schemas"; // предполагаем, что есть yup схема для регистрации
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeRegisterModal } from "../../redux/modal/slice";
import { IoMdClose } from "react-icons/io";

import s from "./RegisterModal.module.css";

const RegisterModal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async ({ email, password }) => {
    try {
        
      await registerUser(email, password);
      dispatch(closeRegisterModal());
      navigate("/teachers");
    } catch (error) {
      setFirebaseError(error.message || "Registration failed");
    }
  };


  return (
    <div className={s.overlay}>
      <div className={s.modal}>
        <button
          type="button"
          aria-label="Close registration modal"
          className={s.closeBtn}
          onClick={() => dispatch(closeRegisterModal())}
        >
         <IoMdClose />
        </button>
        <h2 className={s.title}>Registration</h2>
        <p className={s.subtitle}>
        Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information
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
  <input
    {...register("name")}
    className={s.input}
    placeholder="Name"
    autoComplete="name"
  />
  {errors.name && <p className={s.error}>{errors.name.message}</p>}
</div>

          <div className={s.inputGroup}>
            <div className={s.passwordWrapper}>
              <input
                {...register("password")}
                type={passwordVisible ? "text" : "password"}
                className={s.input}
                placeholder="Password"
                autoComplete="new-password"
              />
              <svg
                className={s.eyeIcon}
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                <use href={`/symbol-defs.svg#${passwordVisible ? "icon-eye" : "icon-eye-blocked"}`} />
              </svg>
            </div>
            {errors.password && <p className={s.error}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={s.submitBtn}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
