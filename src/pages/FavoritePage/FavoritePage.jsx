import { useState } from "react";
import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorite/selectors";
import s from "./FavoritesPage.module.css";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

const FavoritePage = () => {
  const favoriteTeacher = useSelector(selectFavorites);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <ul className={s.list}>
        {favoriteTeacher.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard
              teacher={teacher}
              isExpanded={expandedId === teacher.id}
              onToggle={() => toggleExpand(teacher.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default FavoritePage;
