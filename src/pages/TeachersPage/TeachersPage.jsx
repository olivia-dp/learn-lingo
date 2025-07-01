import React from 'react'
import TeachersList from '../../components/TeacherList/TeacherList';
import s from "./TeachersPage.module.css";


const TeachersPage = () => {
  return (
    <section className={s.list}>

      <TeachersList />
    </section>
  )
}

export default TeachersPage
