import { Container } from './components/Container';
import { AutoComplete } from './components/AutoComplete';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header>
        <Container>
          <h1>Deel Frontend Test</h1>
        </Container>
      </header>
      <main>
        <Container>
          <h2>Search articles</h2>
          <AutoComplete />
        </Container>
      </main>
    </div>
  );
}

export default App;
