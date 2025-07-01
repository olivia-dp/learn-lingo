import { useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favorite/selectors";
import s from "./FavoritesPage.module.css";
import TeacherCard from "../../components/TeacherCard/TeacherCard";

const FavoritePage = () => {
  const favoriteTeacher = useSelector(selectFavorites);

    return (
    <>
<ul className={s.list}>
        {favoriteTeacher.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher}/>
          </li>
        ))}
      </ul>
    </>
  )};
  
  export default FavoritePage;