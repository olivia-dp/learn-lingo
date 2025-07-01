import { NavLink } from "react-router";
import s from "./HomePage.module.css";

const HomePage = () => {
  


  return (
    <section className={s.heroSection}>
      <div className={s.topHero}>
      <div className={s.heroInfo}>
        <h1 className={s.title}>
          Unlock your potential with the best{" "}
          <span className={s.accent}>language</span> tutors
        </h1>
        <p className={s.textInfo}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <NavLink className={s.button} to="/teachers">Get started</NavLink>
      </div>
      <div className={s.heroImg}>
        <img
          src="/img/hero-1x.jpg"
          srcSet="/img/hero-1x.jpg 1x, /img/hero-2x.jpg 2x"
          alt="Student lingo"
          className={s.img}
        />
      </div>
      </div>
      <div className={s.statistBox}>
      <svg className={s.svg} width="1312" height="116" viewBox="0 0 1312 116" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.75" y="0.75" width="1310.5" height="114.5" rx="29.25" stroke="#E0A39A" strokeWidth="1.5" strokeDasharray="15 15"/>
</svg>

  <ul className={s.statList}>
    <li className={s.listItem}>
      <h3 className={s.statNumber}>32,000 +</h3>
      <p className={s.statText}>Experienced tutors</p>
    </li>
    <li className={s.listItem}>
      <h3 className={s.statNumber}>300,000 +</h3>
      <p className={s.statText}>5-star tutor reviews</p>
    </li>
    <li className={s.listItem}>
      <h3 className={s.statNumber}>120 +</h3>
      <p className={s.statText}>Subjects taught</p>
    </li>
    <li className={s.listItem}>
      <h3 className={s.statNumber}>200 +</h3>
      <p className={s.statText}>Tutor nationalities</p>
    </li>
  </ul>
</div>

    </section>
  );
};

export default HomePage;
