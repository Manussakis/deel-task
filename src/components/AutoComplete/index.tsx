import { useCallback, useEffect, useState } from 'react';
import { highlightText } from '../../utils/functions';
import debounce from 'lodash.debounce';
import { DEBOUNCE_TIME, ITEM_LINK_CLASSNAME } from '../../utils/constants';
import { fetchData } from '../../api';
import { Item } from './Item';

import { Hit } from './types';

import styles from './styles.module.scss';

const autocompleteInputClassName = 'autocomplete-input';

export const AutoComplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Hit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const debHandleOnChange = useCallback(
    debounce((value: string) => setSearchTerm(value), DEBOUNCE_TIME),
    []
  );

  const handleOnBlur = useCallback(() => {
    requestAnimationFrame(() => {
      const activeElement = document.activeElement;

      if (!activeElement?.classList.contains(ITEM_LINK_CLASSNAME) &&
        !activeElement?.classList.contains(autocompleteInputClassName)
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
          const filterHits = hits.filter((hit: Hit) => hit.title);

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
        className={`${styles.input} ${autocompleteInputClassName}`}
        type="text"
        id="auto-complete"
        onChange={(e) => debHandleOnChange(e.target.value.trim())}
        onBlur={handleOnBlur}
        onFocus={() => setIsDropdownVisible(true)}
      />
      {hasError && <p>Ops! Something went wrong.</p>}
      {isDropdownVisible && !hasError && (
        <ul className={styles.dropdown}>
          {results.map((item: Hit) => {
            const content = highlightText(item.title, searchTerm);

            return (
              <Item
                key={item.objectID}
                url={item.url}
                onBlur={handleOnBlur}
                content={content}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}
