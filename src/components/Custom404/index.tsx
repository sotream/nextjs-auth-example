// Core
import Link from 'next/link';

// Styles
import Styles from './styles/index.module.scss';

export const Custom404 = () => {
  return (
    <section className = { Styles.container }>
      <h1>Error 404!</h1>
      <p className={Styles.descriptionText}>🌲 Maybe, <span>you are lost in a forest</span>. 🌲</p>
      <div className={ Styles.linkWrapper }>
        <Link href = '/'>
          🕊 Exit... 🪶
        </Link>
      </div>
    </section>
  );
};
