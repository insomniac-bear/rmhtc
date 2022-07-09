import { FC } from 'react';
import Link from 'next/link';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import events from '../../mockData/events';
import { EventPreview } from '../EventPreview/EventPreview';
import styles from './Events.module.css';
import { Button } from '../Button/Button';
import eventsTags from '../../mockData/eventsTags';
import { IEventsProps } from './Events.props';

export const Events: FC<IEventsProps> = ({ className = '', ...props }) => (
  <section className={`${styles.events} ${className}`} {...props}>
    <SectionTitle>Events</SectionTitle>
    <div className={styles.events__wrapper}>
      <div className={styles.events__filter}>
        <ul className={styles.events__tagsList}>
          <li>
            <Button className={styles.events__filterBtn} type="button" appearance="ghost">All</Button>
          </li>
          {eventsTags.map((tag) => (
            <li key={tag}>
              <Button className={styles.events__filterBtn} type="button" appearance="ghost">{tag}</Button>
            </li>
          ))}
        </ul>
        <ul className={styles.events__tagsList}>
          <li>
            <Button
              className={`${styles.events__filterBtn} ${styles.events__filterBtn_dropDown}`}
              type="button"
              appearance="ghost"
            >
              06.06.2022
            </Button>
          </li>
          <li>
            <Button className={`${styles.events__filterBtn} ${styles.events__filterBtn_dropDown}`} type="button" appearance="ghost">All</Button>
          </li>
        </ul>
      </div>
      <ul className={styles.events__list}>
        {events.map((event) => (
          <li key={event.id}>
            <Link href={`/events/${event.id}`} passHref>
              <a>
                <EventPreview
                  isNew={event.isNew}
                  title={event.title}
                  date={event.date}
                  address={event.address}
                />
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Button className={styles.events__moreBtn} type="button" appearance="ghost">More events</Button>
    </div>
  </section>
);
