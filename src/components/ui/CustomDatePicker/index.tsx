'use client'

import { ChangeEvent, useEffect, useRef, useState } from 'react'
import styles from './CustomDatePicker.module.scss'
import { formatData, getArray, renderGrid } from '@/components/utils/utils'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setDateSortMyRecipes } from '@/store/features/user/user.slice'

type IdValueType = {
  id: number
  value: string
}

export const WEEK_DAY_LIST: Array<IdValueType> = [
  { id: 0, value: 'Пн' },
  { id: 1, value: 'Вт' },
  { id: 2, value: 'Ср' },
  { id: 3, value: 'Чт' },
  { id: 4, value: 'Пт' },
  { id: 5, value: 'Сб' },
  { id: 6, value: 'Вс' },
]

type MonthListItemType = {
  id: number
  textId: string
  ruText: string
}

export const MONTH_LIST: Array<MonthListItemType> = [
  { id: 0, textId: '00', ruText: 'Январь' },
  { id: 1, textId: '01', ruText: 'Февраль' },
  { id: 2, textId: '02', ruText: 'Март' },
  { id: 3, textId: '03', ruText: 'Апрель' },
  { id: 4, textId: '04', ruText: 'Май' },
  { id: 5, textId: '05', ruText: 'Июнь' },
  { id: 6, textId: '06', ruText: 'Июль' },
  { id: 7, textId: '07', ruText: 'Август' },
  { id: 8, textId: '08', ruText: 'Сентябрь' },
  { id: 9, textId: '09', ruText: 'Октябрь' },
  { id: 10, textId: '10', ruText: 'Ноябрь' },
  { id: 11, textId: '11', ruText: 'Декабрь' },
]

export const YEAR_LIST: Array<IdValueType> = [
  //! если нужно, добавить установку последнего (текущего) года
  { id: 2025, value: '2025' },
  { id: 2026, value: '2026' },
  { id: 2027, value: '2027' },
  { id: 2028, value: '2028' },
  { id: 2029, value: '2029' },
  { id: 2030, value: '2030' },
  { id: 2031, value: '2031' },
]

type DataItemType = {
  id: number
  year: number
  month: number
  numDay: number
  firstWeekDay: number
}

export const DATA: Array<DataItemType> = [
  //! если нужно, переделать на функцию
  { id: 1, year: 2025, month: 0, numDay: 31, firstWeekDay: 2 }, // Январь
  { id: 2, year: 2025, month: 1, numDay: 28, firstWeekDay: 5 }, // Февраль
  { id: 3, year: 2025, month: 2, numDay: 31, firstWeekDay: 5 }, // Март
  { id: 4, year: 2025, month: 3, numDay: 30, firstWeekDay: 1 }, // Апрель
  { id: 5, year: 2025, month: 4, numDay: 31, firstWeekDay: 3 }, // Май
  { id: 6, year: 2025, month: 5, numDay: 30, firstWeekDay: 6 }, // Июнь
  { id: 7, year: 2025, month: 6, numDay: 31, firstWeekDay: 1 }, // Июль
  { id: 8, year: 2025, month: 7, numDay: 31, firstWeekDay: 4 }, // Август
  { id: 9, year: 2025, month: 8, numDay: 30, firstWeekDay: 0 }, // Сентябрь
  { id: 10, year: 2025, month: 9, numDay: 31, firstWeekDay: 2 }, // Октябрь
  { id: 11, year: 2025, month: 10, numDay: 30, firstWeekDay: 5 }, // Ноябрь
  { id: 12, year: 2025, month: 11, numDay: 31, firstWeekDay: 0 }, // Декабрь
  { id: 13, year: 2026, month: 0, numDay: 31, firstWeekDay: 3 }, // Январь
  { id: 14, year: 2026, month: 1, numDay: 29, firstWeekDay: 6 }, // Февраль
  { id: 15, year: 2026, month: 2, numDay: 31, firstWeekDay: 6 }, // Март
  { id: 16, year: 2026, month: 3, numDay: 30, firstWeekDay: 2 }, // Апрель
  { id: 17, year: 2026, month: 4, numDay: 31, firstWeekDay: 4 }, // Май
  { id: 18, year: 2026, month: 5, numDay: 30, firstWeekDay: 0 }, // Июнь
  { id: 19, year: 2026, month: 6, numDay: 31, firstWeekDay: 2 }, // Июль
  { id: 20, year: 2026, month: 7, numDay: 31, firstWeekDay: 5 }, // Август
  { id: 21, year: 2026, month: 8, numDay: 30, firstWeekDay: 1 }, // Сентябрь
  { id: 22, year: 2026, month: 9, numDay: 31, firstWeekDay: 3 }, // Октябрь
  { id: 23, year: 2026, month: 10, numDay: 30, firstWeekDay: 6 }, // Ноябрь
  { id: 24, year: 2026, month: 11, numDay: 31, firstWeekDay: 1 }, // Декабрь

  { id: 25, year: 2027, month: 0, numDay: 31, firstWeekDay: 4 }, // Январь
  { id: 26, year: 2027, month: 1, numDay: 28, firstWeekDay: 0 }, // Февраль
  { id: 27, year: 2027, month: 2, numDay: 31, firstWeekDay: 0 }, // Март
  { id: 28, year: 2027, month: 3, numDay: 30, firstWeekDay: 3 }, // Апрель
  { id: 29, year: 2027, month: 4, numDay: 31, firstWeekDay: 5 }, // Май
  { id: 30, year: 2027, month: 5, numDay: 30, firstWeekDay: 1 }, // Июнь
  { id: 31, year: 2027, month: 6, numDay: 31, firstWeekDay: 3 }, // Июль
  { id: 32, year: 2027, month: 7, numDay: 31, firstWeekDay: 6 }, // Август
  { id: 33, year: 2027, month: 8, numDay: 30, firstWeekDay: 2 }, // Сентябрь
  { id: 34, year: 2027, month: 9, numDay: 31, firstWeekDay: 4 }, // Октябрь
  { id: 35, year: 2027, month: 10, numDay: 30, firstWeekDay: 0 }, // Ноябрь
  { id: 36, year: 2027, month: 11, numDay: 31, firstWeekDay: 2 }, // Декабрь

  { id: 37, year: 2028, month: 0, numDay: 31, firstWeekDay: 6 }, // Январь
  { id: 38, year: 2028, month: 1, numDay: 29, firstWeekDay: 2 }, // Февраль
  { id: 39, year: 2028, month: 2, numDay: 31, firstWeekDay: 2 }, // Март
  { id: 40, year: 2028, month: 3, numDay: 30, firstWeekDay: 5 }, // Апрель
  { id: 41, year: 2028, month: 4, numDay: 31, firstWeekDay: 0 }, // Май
  { id: 42, year: 2028, month: 5, numDay: 30, firstWeekDay: 3 }, // Июнь
  { id: 43, year: 2028, month: 6, numDay: 31, firstWeekDay: 5 }, // Июль
  { id: 44, year: 2028, month: 7, numDay: 31, firstWeekDay: 1 }, // Август
  { id: 45, year: 2028, month: 8, numDay: 30, firstWeekDay: 4 }, // Сентябрь
  { id: 46, year: 2028, month: 9, numDay: 31, firstWeekDay: 6 }, // Октябрь
  { id: 47, year: 2028, month: 10, numDay: 30, firstWeekDay: 2 }, // Ноябрь
  { id: 48, year: 2028, month: 11, numDay: 31, firstWeekDay: 4 }, // Декабрь

  { id: 49, year: 2029, month: 0, numDay: 31, firstWeekDay: 0 }, // Январь
  { id: 50, year: 2029, month: 1, numDay: 28, firstWeekDay: 3 }, // Февраль
  { id: 51, year: 2029, month: 2, numDay: 31, firstWeekDay: 3 }, // Март
  { id: 52, year: 2029, month: 3, numDay: 30, firstWeekDay: 6 }, // Апрель
  { id: 53, year: 2029, month: 4, numDay: 31, firstWeekDay: 1 }, // Май
  { id: 54, year: 2029, month: 5, numDay: 30, firstWeekDay: 4 }, // Июнь
  { id: 55, year: 2029, month: 6, numDay: 31, firstWeekDay: 6 }, // Июль
  { id: 56, year: 2029, month: 7, numDay: 31, firstWeekDay: 2 }, // Август
  { id: 57, year: 2029, month: 8, numDay: 30, firstWeekDay: 5 }, // Сентябрь
  { id: 58, year: 2029, month: 9, numDay: 31, firstWeekDay: 0 }, // Октябрь
  { id: 59, year: 2029, month: 10, numDay: 30, firstWeekDay: 3 }, // Ноябрь
  { id: 60, year: 2029, month: 11, numDay: 31, firstWeekDay: 5 }, // Декабрь

  { id: 61, year: 2030, month: 0, numDay: 31, firstWeekDay: 1 }, // Январь
  { id: 62, year: 2030, month: 1, numDay: 28, firstWeekDay: 4 }, // Февраль
  { id: 63, year: 2030, month: 2, numDay: 31, firstWeekDay: 4 }, // Март
  { id: 64, year: 2030, month: 3, numDay: 30, firstWeekDay: 0 }, // Апрель
  { id: 65, year: 2030, month: 4, numDay: 31, firstWeekDay: 2 }, // Май
  { id: 66, year: 2030, month: 5, numDay: 30, firstWeekDay: 5 }, // Июнь
  { id: 67, year: 2030, month: 6, numDay: 31, firstWeekDay: 0 }, // Июль
  { id: 68, year: 2030, month: 7, numDay: 31, firstWeekDay: 3 }, // Август
  { id: 69, year: 2030, month: 8, numDay: 30, firstWeekDay: 6 }, // Сентябрь
  { id: 70, year: 2030, month: 9, numDay: 31, firstWeekDay: 1 }, // Октябрь
  { id: 71, year: 2030, month: 10, numDay: 30, firstWeekDay: 4 }, // Ноябрь
  { id: 72, year: 2030, month: 11, numDay: 31, firstWeekDay: 6 }, // Декабрь

  { id: 73, year: 2031, month: 0, numDay: 31, firstWeekDay: 2 }, // Январь
  { id: 74, year: 2031, month: 1, numDay: 28, firstWeekDay: 5 }, // Февраль
  { id: 75, year: 2031, month: 2, numDay: 31, firstWeekDay: 5 }, // Март
  { id: 76, year: 2031, month: 3, numDay: 30, firstWeekDay: 1 }, // Апрель
  { id: 77, year: 2031, month: 4, numDay: 31, firstWeekDay: 3 }, // Май
  { id: 78, year: 2031, month: 5, numDay: 30, firstWeekDay: 6 }, // Июнь
  { id: 79, year: 2031, month: 6, numDay: 31, firstWeekDay: 1 }, // Июль
  { id: 80, year: 2031, month: 7, numDay: 31, firstWeekDay: 4 }, // Август
  { id: 81, year: 2031, month: 8, numDay: 30, firstWeekDay: 0 }, // Сентябрь
  { id: 82, year: 2031, month: 9, numDay: 31, firstWeekDay: 2 }, // Октябрь
  { id: 83, year: 2031, month: 10, numDay: 30, firstWeekDay: 5 }, // Ноябрь
  { id: 84, year: 2031, month: 11, numDay: 31, firstWeekDay: 0 }, // Декабрь
]

export type CalendarItemType = {
  id: number
  value: number | string
  className: string
  dataSet: string
}

export default function CustomDatePicker() {
  const dispatch = useAppDispatch()
  const [isCalendarVisible, setIsCalendarVisible] = useState(false)
  const [dataValue, setDataValue] = useState<string | undefined>(undefined)
  const [curMonth, setCurMonth] = useState(3) //! если нужно, добавить установку
  const [curYear, setCurYear] = useState(2025) //! если нужно, добавить установку
  const [prevBtnStyle, setPrevBtnStyle] = useState(true)
  const [nextBtnStyle, setNextBtnStyle] = useState(true)
  const [calendarGrid, setCalendarGrid] = useState<CalendarItemType[]>([])
  const curEl = useRef<HTMLDivElement | null>(null)

  const { myRecipesFromDate } = useAppSelector((state) => state.userSettings)

  useEffect(() => {
    if (myRecipesFromDate) {
      setDataValue(formatData(myRecipesFromDate))
    } else {
      setDataValue('')
    }
  }, [myRecipesFromDate])

  useEffect(() => {
    if (isCalendarVisible) {
      const onClick = function (e: globalThis.MouseEvent): void {
        if (!curEl.current) return

        const target = e.target as Node
        if (!curEl.current.contains(target)) {
          setIsCalendarVisible(false)
        }
      }
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    } else return
  }, [isCalendarVisible])

  useEffect(() => {
    if (curMonth === 0 && curYear === YEAR_LIST[0].id) setPrevBtnStyle(false)
    else setPrevBtnStyle(true)

    if (curMonth === 11 && curYear === YEAR_LIST[YEAR_LIST.length - 1].id)
      setNextBtnStyle(false)
    else setNextBtnStyle(true)
  }, [curMonth, curYear])

  useEffect(() => {
    setCalendarGrid(renderGrid(curMonth, curYear))
  }, [curMonth, curYear])

  const toggleCalendar = () => setIsCalendarVisible(!isCalendarVisible)

  // const clearDate = () => dispatch(setDateSortMyRecipes(undefined))

  const clearDate = () => {
    dispatch(setDateSortMyRecipes(undefined)) // Очищаем выбор даты

    setCurMonth(3) // индекс месяца 3 означает апрель
    setCurYear(2025) // фиксированный год
  }

  const handlerChangeMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurMonth(+e.target.value)
  }

  const handlerChangeYear = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurYear(+e.target.value)
  }

  const handlerPrevMonth = () => {
    if (curMonth === 0) {
      if (curYear !== YEAR_LIST[0].id) {
        setCurMonth(11)
        setCurYear(curYear - 1)
      }
    } else {
      setCurMonth(curMonth - 1)
    }
  }

  const handlerNextMonth = () => {
    if (curMonth === 11) {
      if (curYear !== YEAR_LIST[YEAR_LIST.length - 1].id) {
        setCurMonth(0)
        setCurYear(curYear + 1)
      }
    } else {
      setCurMonth(curMonth + 1)
    }
  }

  const handlerClickOnDay = (e: React.MouseEvent<HTMLDivElement>) => {
    const curData = e.currentTarget?.dataset.day

    if (curData && curData !== 'X') {
      dispatch(setDateSortMyRecipes(curData))
      setIsCalendarVisible(false)
    }
  }

  const prevBtn = prevBtnStyle
    ? `${styles.prev}`
    : `${styles.prev} ${styles.notActive}`
  const nextBtn = nextBtnStyle
    ? `${styles.next}`
    : `${styles.next} ${styles.notActive}`

  return (
    <div className={styles.customDatePicker}>
      <input
        type="text"
        disabled
        placeholder="Выберите нужную дату"
        className={styles.datePickerInput}
        value={dataValue}
      />
      {dataValue ? (
        <div className={styles.closeIcon} onClick={clearDate} />
      ) : (
        <div className={styles.calendarIcon} onClick={toggleCalendar} />
      )}
      {isCalendarVisible && (
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
                      {el.ruText}
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
              <div className={prevBtn} onClick={handlerPrevMonth} />
              <div className={nextBtn} onClick={handlerNextMonth} />
            </div>
          </div>
          <div className={styles.weekDays}>
            {WEEK_DAY_LIST.map((el) => (
              <div className={styles.weekDay} key={el.id}>
                {el.value}
              </div>
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
      )}
    </div>
  )
}
