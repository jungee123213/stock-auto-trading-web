import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Stock Auto Trading</h1>
      <nav>
        <Link to="/" style={styles.link}>스크리너</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 24px',
    height: '60px',
    backgroundColor: '#1a1a2e',
    color: 'white',
  },
  title: {
    fontSize: '20px',
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '14px',
  }
};

export default Header;