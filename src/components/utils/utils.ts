import { CalendarItemType, DATA, MONTH_LIST } from "../ui/CustomDatePicker";

export const getArray = (numStart: number, numEnd: number) => {
  const arr: number[] = [];

  for (let i = numStart; i < numEnd + 1; i++) {
    arr.push(i);
  }

  return arr;
};

export const renderGrid = (curMonth: number, curYear: number) => {
  const tempArr: Array<CalendarItemType> = [];
  const curMonthData = DATA.find((el) => el.month === curMonth && el.year === curYear);
  const prevMonthData = curMonthData ? DATA.find((el) => el.id === (curMonthData.id - 1)) : null;
  const nextMonthData = curMonthData ? DATA.find((el) => el.id === (curMonthData.id + 1)) : null;

  const setPrevMonthData = () => {
    if (curMonthData) {
      if (curMonthData.firstWeekDay === 0) return;
      if (prevMonthData) {
        getArray(1, prevMonthData.numDay).slice(-curMonthData.firstWeekDay).forEach((el) => {
          tempArr.push({id: tempArr.length, value: el, className: 'prevNextMonthDay',
            dataSet: `${prevMonthData.year}-${(prevMonthData.month).toString().padStart(2, '0')}-${(el).toString().padStart(2, '0')}`
          });
        });
      } else {
        for (let i = 0; i <curMonthData.firstWeekDay; i++) {
          tempArr.push({id: tempArr.length, value: 'X', className: 'unActiveDay', dataSet: 'X'});
        }
      }
    }
  };

  const setCurMonthData = () => {
    if (curMonthData) {
      for (let i = 1; i <= curMonthData.numDay; i++) {
        tempArr.push({id: tempArr.length, value: i, className: 'curMonthDay',
          dataSet: `${curMonthData.year}-${(curMonthData.month).toString().padStart(2, '0')}-${(i).toString().padStart(2, '0')}`});
      }
    }
  };

  const setNextMonthData = () => {
    if (curMonthData) {
      getArray(1, 42 - tempArr.length).forEach((el) => {
        if (nextMonthData) {
          tempArr.push({id: tempArr.length, value: el, className: 'prevNextMonthDay',
            dataSet: `${nextMonthData.year}-${(nextMonthData.month).toString().padStart(2, '0')}-${(el).toString().padStart(2, '0')}`});
        } else {
          tempArr.push({id: tempArr.length, value: 'X', className: 'unActiveDay', dataSet: 'X'});
        }
      });
    }
  };

  setPrevMonthData();
  setCurMonthData();
  setNextMonthData();

  return tempArr;
};

export const formatData = (myRecipesFromDate: string) => {
  const dataValueFormatted: string[] = [];
  const tempArr = myRecipesFromDate.split('-');
  dataValueFormatted[0] = tempArr[0];
  dataValueFormatted[1] = MONTH_LIST.find((el) => el.textId === tempArr[1])?.ruText as string;
  dataValueFormatted[2] = tempArr[2];
  const outData = dataValueFormatted.join(' - ');
  
  return outData;
};
