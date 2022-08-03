import { useCallback, useEffect, useState } from 'react';
import { debounce, highlightText } from '../../utils/functions';
import { DEBOUNCE_TIME } from '../../utils/constants';
import { fetchData } from '../../api';

import { Hints } from './types';

import styles from './styles.module.scss';

export const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Hints[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const debHandleOnChange = useCallback(debounce((value: string) => {
    setSearchTerm(value);
  }, DEBOUNCE_TIME), []);

  const handleOnBlur = useCallback(() => {
    requestAnimationFrame(() => {
      const activeElement = document.activeElement;

      if (!activeElement?.classList.contains('item-link') &&
        !activeElement?.classList.contains('autocomplete-input')
      ) {
        setIsDropdownVisible(false);
      }
    });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const getData = async () => {
        setIsLoading(false);
        setHasError(false);

        try {
          setIsLoading(true);
          const data = await fetchData(searchTerm);
          const { hits } = data;
          const filterHits = hits.filter((hit: Hints) => hit.title);

          setResults(filterHits);
        } catch (error) {
          setHasError(true);
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      getData();
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  return (
    <div className={styles.inputWrapper}>
      {isLoading && <span className={styles.loader}>Loading...</span>}
      <label className={styles.label} htmlFor="auto-complete">Search</label>
      <input
        className={`${styles.input} autocomplete-input`}
        type="text"
        id="auto-complete"
        onChange={(e) => debHandleOnChange(e.target.value)}
        onBlur={handleOnBlur}
        onFocus={() => setIsDropdownVisible(true)}
      />
      {hasError && <p>Ops! Something went wrong.</p>}
      {isDropdownVisible && !hasError && (
        <ul className={styles.dropdown}>
          {results.map((item: any) => (
            <li className={styles.item} key={item.objectID}>
              {/* @TODO: It should highlight the term in the text regardless of whether
              the term is lowercase or uppercase. */}
              <a
                className={`${styles.itemLink} item-link`}
                href={item.url}
                onBlur={handleOnBlur}
                dangerouslySetInnerHTML={{__html: highlightText(item.title, searchTerm)}}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
