// TeacherDetails.jsx
import s from "./TeacherCard.module.css";

const TeacherDetails = ({ teacher }) => {
  const { reviews, levels, experience } = teacher;

  return (
    <>
      <p className={s.experience}>{experience}</p>

      <div className={s.reviews}>
        {reviews.map((r, i) => (
          <div key={i} className={s.review}>
            <div className={s.reviewer}>
              <img
                src={`https://i.pravatar.cc/40?img=${i + 10}`}
                alt={r.reviewer_name}
                className={s.reviewerAvatar}
              />
              <strong>{r.reviewer_name}</strong>
              <span>⭐ {r.reviewer_rating}</span>
            </div>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>

      <div className={s.levels}>
        {levels.map((level) => (
          <span key={level} className={s.level}>#{level}</span>
        ))}
      </div>

      <button className={s.bookBtn}>Book trial lesson</button>
    </>
  );
};

export default TeacherDetails;
