import Link from 'next/link';
import classes from './MainHeader.module.css';

const MainHeader = () => (
  <header className={classes.header}>
    <div className={classes.logo}>
      <Link href='/'>NextEvents - (sec.8)</Link>
    </div>
    <nav className={classes.navigation}>
      <ul>
        <li>
          <Link href='/events'>Browse All Events</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default MainHeader;
