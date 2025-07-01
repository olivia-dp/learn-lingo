import { useSelector, useDispatch } from "react-redux";
import { closeTrialModal } from "../../redux/modal/slice";
import { selectIsTrialModalOpen, selectTrialTeacher } from "../../redux/modal/selectors";
import { IoMdClose } from "react-icons/io";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import s from "./TrialModal.module.css";

// Варианты причин
const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

// Схема валидации через Yup
const schema = yup.object().shape({
  reason: yup.string().required("Please select a reason"),
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

const TrialLessonModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsTrialModalOpen);
  const teacher = useSelector(selectTrialTeacher);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    dispatch(closeTrialModal());
  };

  if (!isOpen || !teacher) return null;

  return (
    <div className={s.backdrop} onClick={() => dispatch(closeTrialModal())}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button className={s.closeBtn} onClick={() => dispatch(closeTrialModal())}>
          <IoMdClose />
        </button>
        <h2 className={s.title}>Book trial lesson</h2>
        <p className={s.desc}>
          Our experienced tutor will assess your current language level, discuss your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={s.teacher}>
          <img src={teacher.avatar_url} alt={teacher.name} className={s.avatar} />
          <div>
            <div className={s.label}>Your teacher</div>
            <div className={s.name}>{teacher.name} {teacher.surname}</div>
          </div>
        </div>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p className={s.question}>What is your main reason for learning English?</p>
            <Controller
              control={control}
              name="reason"
              render={({ field }) => (
                <>
                  {reasons.map((r) => (
                    <label key={r} className={s.radio}>
                      <input
                        type="radio"
                        value={r}
                        checked={field.value === r}
                        onChange={() => field.onChange(r)}
                      />
                      <span className={s.customRadio}></span>{r}
                    </label>
                  ))}
                </>
              )}
            />
            {errors.reason && <p className={s.error}>{errors.reason.message}</p>}
          </div>

          <input
            type="text"
            placeholder="Full Name"
            className={s.input}
            {...register("fullName")}
          />
          {errors.fullName && <p className={s.error}>{errors.fullName.message}</p>}

          <input
            type="email"
            placeholder="Email"
            className={s.input}
            {...register("email")}
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}

          <input
            type="tel"
            placeholder="Phone number"
            className={s.input}
            {...register("phone")}
          />
          {errors.phone && <p className={s.error}>{errors.phone.message}</p>}

          <button type="submit" className={s.bookBtn}>Book</button>
        </form>
      </div>
    </div>
  );
};

export default TrialLessonModal;
