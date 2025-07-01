import { useDispatch, useSelector } from "react-redux";
import { selectIsFavorite } from "../../redux/favorite/selectors";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/favorite/slice";
import s from "./TeacherCard.module.css";
import { openTrialModal } from "../../redux/modal/slice";
import { selectIsAuth } from "../../redux/auth/selectors";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { TbBook } from "react-icons/tb";

const TeacherCard = ({ teacher, isExpanded, onToggle }) => {
  const {
    name,
    surname,
    languages = [],
    levels = [],
    rating,
    reviews = [],
    price_per_hour,
    lessons_done,
    avatar_url,
    lesson_info = "",
    conditions = [],
    experience = "",
  } = teacher;

  const user = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const isActive = useSelector(selectIsFavorite(teacher.id));

  const toggleFavorite = () => {
    if (!user) {
      toast("Please Log In or Register to use favorites", { icon: "🔒" });
      return;
    }

    if (isActive) {
      dispatch(removeFromFavorites(teacher.id));
    } else {
      dispatch(addToFavorites(teacher));
    }
  };

  return (
    <div className={s.card}>
      <div className={s.avatarBox}>
        <img src={avatar_url} alt={`${name} ${surname}`} className={s.avatar} />
      </div>

      <div className={s.box}>
        <div className={s.header}>
          <p className={s.label}>Languages</p>
          <ul className={s.meta}>
            <li className={s.listItem}><TbBook className={s.iconBook}/> Lessons online</li>
            <li className={s.listItem}>Lessons done: {lessons_done}</li>
            <li className={s.listItem}><FaStar className={s.icon}/> Rating: {rating}</li>
            <li className={s.listItem}>
              Price / 1 hour: <span className={s.price}>${price_per_hour}</span>
            </li>
          </ul>
          <div onClick={toggleFavorite}>
            {!isActive ? (
              <svg className={s.iconLike}>
                <use href={"/symbol.svg#icon-like"} />
              </svg>
            ) : (
              <svg className={s.active}>
                <use href={"/symbol.svg#icon-like-active"} />
              </svg>
            )}
          </div>
        </div>

        <div className={s.info}>
          <h2 className={s.name}>
            {name} {surname}
          </h2>
          <ul className={s.textList}>
            <li className={s.text}>
              Speaks:<span className={s.accent}> {languages.join(", ")}</span>
            </li>
            <li className={s.text}>
              Lesson Info: <span className={s.accentText}>{lesson_info}</span>
            </li>
            <li className={s.text}>
              Conditions:
              <span className={s.accentText}>{conditions.join(" ")}</span>
            </li>
          </ul>

          <button className={s.readMore} onClick={onToggle}>
            {isExpanded ? "Hide details" : "Read more"}
          </button>
        </div>
        <ul className={s.levelList}>
          {levels.map((item) => (
            <li key={item.id} className={s.levelsItem}>
              <p>#{item}</p>
            </li>
          ))}
        </ul>

        {isExpanded && (
          <>
            <p className={s.experience}>{experience}</p>

            <ul className={s.reviews}>
              {reviews.map((item) => (
                <li key={item.id} className={s.review}>
                  <div className={s.reviewer}>
                    {item?.photo ? (
                      <img
                        src={item.photo}
                        alt={item.reviewer_name}
                        className={s.reviewerAvatar}
                      />
                    ) : (
                      <FaRegCircleUser className={s.reviewerAvatar} />
                    )}
                    <div>
                      <p className={s.label}>{item.reviewer_name}</p>
                      <p>
                        <FaStar className={s.icon}/> {item.reviewer_rating}
                      </p>
                    </div>
                  </div>
                  <p className={s.reviewText}>{item.comment}</p>
                </li>
              ))}
            </ul>

            <button
              onClick={() => dispatch(openTrialModal(teacher))}
              className={s.btnTrial}
            >
              Book trial lesson
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TeacherCard;
