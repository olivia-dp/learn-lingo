import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const fetchTeachers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "teachers"));
    const teachers = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return teachers;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
    return [];
  }
};
