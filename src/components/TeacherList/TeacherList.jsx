import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeachersThunk, resetTeachers } from "../../redux/teachers/slice";
import Loader from "../Loader/Loader";
import TeacherCard from "../TeacherCard/TeacherCard";
import s from "./TeachersList.module.css";

const TeachersList = () => {
  const dispatch = useDispatch();
  const { items, lastDocId, loading, error, hasMore } = useSelector(
    (state) => state.teachers
  );
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dispatch(resetTeachers());
    dispatch(fetchTeachersThunk({ lastDocId: null }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchTeachersThunk({ lastDocId }));
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className={s.container}>
      {error && <p className={s.error}>Error: {error}</p>}

      <ul className={s.list}>
        {items.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard
              teacher={teacher}
              isExpanded={teacher.id === expandedId}
              onToggle={() => toggleExpand(teacher.id)}
            />
          </li>
        ))}
      </ul>

      {loading && <Loader />}

      {!loading && hasMore && (
        <button onClick={handleLoadMore} className={s.loadMoreBtn}>
          Load more
        </button>
      )}

      {!hasMore && items.length > 0 && <p>All teachers loaded</p>}
    </div>
  );
};

export default TeachersList;
