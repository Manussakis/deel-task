import { memo } from 'react';
import { ITEM_LINK_CLASSNAME } from '../../../utils/constants';
import { ItemProps }  from './types';
import styles  from './styles.module.scss';

export const ItemComponent = ({url, content, onBlur}: ItemProps) => {
  return (
    <li className={styles.item}>
      {/* @TODO: It should highlight the term in the text regardless of whether
      the term is lowercase or uppercase. */}
      <a
        className={`${styles.itemLink} ${ITEM_LINK_CLASSNAME}`}
        href={url}
        onBlur={onBlur}
        dangerouslySetInnerHTML={{__html: content}}
      />
    </li>
  );
};

export const Item = memo(ItemComponent);
