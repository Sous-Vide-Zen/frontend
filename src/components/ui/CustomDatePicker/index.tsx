'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './CustomDatePicker.module.scss';
import { formatData, getArray, renderGrid } from '@/components/utils/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setDateSortMyRecipes } from '@/store/features/user/user.slice';

type IdValueType = {
  id: number;
  value: string;
};

export const WEEK_DAY_LIST: Array<IdValueType> = [
  {id: 0, value: 'Mon'},
  {id: 1, value: 'Tue'},
  {id: 2, value: 'Wed'},
  {id: 3, value: 'Thu'},
  {id: 4, value: 'Fri'},
  {id: 5, value: 'Sat'},
  {id: 6, value: 'Sun'}
];

type MonthListItemType = {
  id: number;
  value: string;
  textId: string;
  ruText: string;
};

export const MONTH_LIST: Array<MonthListItemType> = [
  {id: 0, value: 'January', textId: '00', ruText: 'Январь'},
  {id: 1, value: 'February', textId: '01', ruText: 'Февраль'},
  {id: 2, value: 'March', textId: '02', ruText: 'Март'},
  {id: 3, value: 'April', textId: '03', ruText: 'Апрель'},
  {id: 4, value: 'May', textId: '04', ruText: 'Май'},
  {id: 5, value: 'June', textId: '05', ruText: 'Июнь'},
  {id: 6, value: 'July', textId: '06', ruText: 'Июль'},
  {id: 7, value: 'August', textId: '07', ruText: 'Август'},
  {id: 8, value: 'September', textId: '08', ruText: 'Сентябрь'},
  {id: 9, value: 'October', textId: '09', ruText: 'Октябрь'},
  {id: 10, value: 'November', textId: '10', ruText: 'Ноябрь'},
  {id: 11, value: 'December', textId: '11', ruText: 'Декабрь'}
];

export const YEAR_LIST: Array<IdValueType> = [  //! если нужно, добавить установку последнего (текущего) года
  {id: 2023, value: '2023'},
  {id: 2024, value: '2024'},
  {id: 2025, value: '2025'}
];

type DataItemType = {
  id: number;
  year: number;
  month: number;
  numDay: number;
  firstWeekDay: number;
};

export const DATA: Array<DataItemType> = [  //! если нужно, переделать на функцию
  {id: 1, year: 2023, month: 0, numDay: 31, firstWeekDay: 6},
  {id: 2, year: 2023, month: 1, numDay: 28, firstWeekDay: 2},
  {id: 3, year: 2023, month: 2, numDay: 31, firstWeekDay: 2},
  {id: 4, year: 2023, month: 3, numDay: 30, firstWeekDay: 5},
  {id: 5, year: 2023, month: 4, numDay: 31, firstWeekDay: 0},
  {id: 6, year: 2023, month: 5, numDay: 30, firstWeekDay: 3},
  {id: 7, year: 2023, month: 6, numDay: 31, firstWeekDay: 5},
  {id: 8, year: 2023, month: 7, numDay: 31, firstWeekDay: 1},
  {id: 9, year: 2023, month: 8, numDay: 30, firstWeekDay: 4},
  {id: 10, year: 2023, month: 9, numDay: 31, firstWeekDay: 6},
  {id: 11, year: 2023, month: 10, numDay: 30, firstWeekDay: 2},
  {id: 12, year: 2023, month: 11, numDay: 31, firstWeekDay: 4},
  {id: 13, year: 2024, month: 0, numDay: 31, firstWeekDay: 0},
  {id: 14, year: 2024, month: 1, numDay: 29, firstWeekDay: 3},
  {id: 15, year: 2024, month: 2, numDay: 31, firstWeekDay: 4},
  {id: 16, year: 2024, month: 3, numDay: 30, firstWeekDay: 0},
  {id: 17, year: 2024, month: 4, numDay: 31, firstWeekDay: 2},
  {id: 18, year: 2024, month: 5, numDay: 30, firstWeekDay: 5},
  {id: 19, year: 2024, month: 6, numDay: 31, firstWeekDay: 0},
  {id: 20, year: 2024, month: 7, numDay: 31, firstWeekDay: 3},
  {id: 21, year: 2024, month: 8, numDay: 30, firstWeekDay: 6},
  {id: 22, year: 2024, month: 9, numDay: 31, firstWeekDay: 1},
  {id: 23, year: 2024, month: 10, numDay: 30, firstWeekDay: 4},
  {id: 24, year: 2024, month: 11, numDay: 31, firstWeekDay: 6},
  {id: 25, year: 2025, month: 0, numDay: 31, firstWeekDay: 2},
  {id: 26, year: 2025, month: 1, numDay: 28, firstWeekDay: 5},
  {id: 27, year: 2025, month: 2, numDay: 31, firstWeekDay: 5},
  {id: 28, year: 2025, month: 3, numDay: 30, firstWeekDay: 1},
  {id: 29, year: 2025, month: 4, numDay: 31, firstWeekDay: 3},
  {id: 30, year: 2025, month: 5, numDay: 30, firstWeekDay: 6},
  {id: 31, year: 2025, month: 6, numDay: 31, firstWeekDay: 1},
  {id: 32, year: 2025, month: 7, numDay: 31, firstWeekDay: 4},
  {id: 33, year: 2025, month: 8, numDay: 30, firstWeekDay: 0},
  {id: 34, year: 2025, month: 9, numDay: 31, firstWeekDay: 2},
  {id: 35, year: 2025, month: 10, numDay: 30, firstWeekDay: 5},
  {id: 36, year: 2025, month: 11, numDay: 31, firstWeekDay: 0},
];

export type CalendarItemType = {
  id: number;
  value: number | string;
  className: string;
  dataSet: string;
};

export default function CustomDatePicker () {
  const dispatch = useAppDispatch();
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [dataValue, setDataValue] = useState<string | undefined>(undefined);
  const [curMonth, setCurMonth] = useState(0);  //! если нужно, добавить установку
  const [curYear, setCurYear] = useState(2023);  //! если нужно, добавить установку
  const [prevBtnStyle, setPrevBtnStyle] = useState(true);
  const [nextBtnStyle, setNextBtnStyle] = useState(true);
  const [calendarGrid, setCalendarGrid] = useState<CalendarItemType[]>([]);
  const curEl = useRef<HTMLDivElement | null>(null);

  const { myRecipesFromDate } = useAppSelector((state) => state.userSettings);

  useEffect(() => {
    if (myRecipesFromDate) {
      setDataValue(formatData(myRecipesFromDate));
    } else {
      setDataValue('');
    }
  }, [myRecipesFromDate]);

  useEffect(() => {
    if (isCalendarVisible) {
      const onClick = function(e: globalThis.MouseEvent): void {
        if (!curEl.current) return;

        const target = e.target as Node;
        if (!curEl.current.contains(target)) {
          setIsCalendarVisible(false);
        }
      };
      document.addEventListener('click', onClick);
      return () => document.removeEventListener('click', onClick);
    } else return;
  }, [isCalendarVisible])

  useEffect(() => {
    if (curMonth === 0 && curYear === YEAR_LIST[0].id ) setPrevBtnStyle(false);
    else setPrevBtnStyle(true);

    if (curMonth === 11 && curYear === YEAR_LIST[(YEAR_LIST.length - 1)].id ) setNextBtnStyle(false);
    else setNextBtnStyle(true);
  }, [curMonth, curYear]);

  useEffect(() => {
    setCalendarGrid(renderGrid(curMonth, curYear));
  }, [curMonth, curYear]);

  const toggleCalendar = () => setIsCalendarVisible(!isCalendarVisible);

  const clearDate = () => dispatch(setDateSortMyRecipes(undefined));


  const handlerChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurMonth(+e.target.value);
  };

  const handlerChangeYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurYear(+e.target.value);
  };

  const handlerPrevMonth = () => {
    if (curMonth === 0) {
      if (curYear !== YEAR_LIST[0].id) {
        setCurMonth(11);
        setCurYear(curYear - 1);
      }
    } else {
      setCurMonth(curMonth - 1);
    }
  };

  const handlerNextMonth = () => {
    if (curMonth === 11) {
      if (curYear !== YEAR_LIST[(YEAR_LIST.length - 1)].id) {
        setCurMonth(0);
        setCurYear(curYear + 1);
      }
    } else {
      setCurMonth(curMonth + 1);
    }
  };

  const handlerClickOnDay = (e: React.MouseEvent<HTMLDivElement>) => {
    const curData = e.currentTarget?.dataset.day;

    if (curData && curData !=='X') {
      dispatch(setDateSortMyRecipes(curData));
      setIsCalendarVisible(false);
    }
  };

  const prevBtn = prevBtnStyle ? `${styles.prev}` : `${styles.prev} ${styles.notActive}`;
  const nextBtn = nextBtnStyle ? `${styles.next}` : `${styles.next} ${styles.notActive}`;

  return (
    <div className={styles.customDatePicker}>
      <input
        type="text"
        disabled
        placeholder='Выберите нужную дату'
        className={styles.datePickerInput}
        value={dataValue}
      />
      {dataValue
        ? <div className={styles.closeIcon} onClick={clearDate}/>
        : <div className={styles.calendarIcon} onClick={toggleCalendar}/>
      }
      {isCalendarVisible &&
        <div className={styles.calendar} ref={curEl}>
          <div className={styles.header}>
            <div className={styles.monthYear}>
              <div className={styles.month}>
                <select
                  name="selectMonth"
                  id="selectMonth"
                  className={styles.customSelect}
                  onChange={handlerChangeMonth}
                  value={curMonth}
                >
                  {MONTH_LIST.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.year}>
                <select
                  name="selectYear"
                  id="selectYear"
                  className={styles.customSelect}
                  onChange={handlerChangeYear}
                  value={curYear}
                >
                  {YEAR_LIST.map((el) => (
                    <option key={el.id} value={el.id}>
                      {el.value}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.control}>
              <div className={prevBtn} onClick={handlerPrevMonth}/>
              <div className={nextBtn} onClick={handlerNextMonth} />
            </div>
          </div>
          <div className={styles.weekDays}>
            {WEEK_DAY_LIST.map((el) => (
              <div className={styles.weekDay} key={el.id}>{el.value}</div>
            ))}
          </div>
          <div className={styles.days}>
            {calendarGrid.map((el) => (
              <div
                key={el.id}
                className={`${styles.day} ${styles[el.className]}`}
                data-day={`${el.dataSet}`}
                onClick={handlerClickOnDay}
              >
                {el.value}
              </div>
            ))}
          </div>
        </div>
      }
    </div>
  )
}
