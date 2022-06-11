import { FC, useState } from 'react';
import { ILangListProps } from './LangList.props';
import { langListMockData } from './langListMockData';
import styles from './LangList.module.css';

export const LangList: FC<ILangListProps> = ({ className, ...props }) => {
  const [lang, setLang] = useState<{id: string, title: string}>(langListMockData[1]);

  const changeLangHandler = (langToSet: {id: string, title: string}) => {
    setLang(langToSet);
  };

  return (
    <ul className={`${styles.langList} ${className}`} {...props}>
      {langListMockData.map((langListItem) => {
        const isActive = langListItem === lang;
        return (
          <li className={styles.langList__listItem} key={langListItem.id}>
            <button
              className={`${styles.langList__button} ${isActive ? styles.langList__button_active : ''} `}
              type="button"
              onClick={() => changeLangHandler(langListItem)}
            >
              {langListItem.title}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
