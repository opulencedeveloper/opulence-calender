import React, { useState } from "react";
import classNames from "classnames";

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);


  const handleDateClick = (date, index) => {
    if (date.getMonth() < currentMonth.getMonth()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    } else {
      setSelectedDate(date);
    }

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);

    console.log(`Selected Date: ${formattedDate}`);
  };

  const handleMonthChange = (event) => {
    const selectedMonth = parseInt(event.target.value);
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        selectedMonth,
        currentMonth.getDate()
      )
    );
  };

  const handleYearChange = (event) => {
    const selectedYear = parseInt(event.target.value);
    setCurrentMonth(
      new Date(selectedYear, currentMonth.getMonth(), currentMonth.getDate())
    );
  };

  const renderHeader = () => {
    const monthOptions = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthOptions[currentMonth.getMonth()];
    const year = currentMonth.getFullYear();

    return (
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl md:text-2xl">
          {month} {year}
        </div>
        <div>
          <button
            className="font-bold py-2 px-4 rounded"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1
                )
              )
            }
          >
            <img
              src="/angle-left-gray.svg"
              alt="angle-right-gray-icon"
              className="w-auto h-auto"
            />
          </button>
          <button
            className="font-bold py-2 px-4 rounded"
            onClick={() =>
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1
                )
              )
            }
          >
            <img
              src="/angle-right-gray.svg"
              alt="angle-right-right-icon"
              className="w-auto h-auto"
              
            />
          </button>{" "}
        </div>
      </div>
    );
  };

  const renderYearPicker = () => {
    const startYear = 1900;
    const endYear = new Date().getFullYear() + 10;
    const years = [];

    for (let year = startYear; year <= endYear; year++) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return (
      <select
        className="py-2 rounded cursor-pointer outline-none pl-2 pr-5"
        value={currentMonth.getFullYear()}
        onChange={handleYearChange}
      >
        {years}
      </select>
    );
  };

  const renderMonthPicker = () => {
    const monthOptions = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <select
        className="py-2 rounded cursor-pointer outline-none"
        value={currentMonth.getMonth()}
        onChange={handleMonthChange}
        style={{ width: 60 }}
      >
        {monthOptions.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  const Weekdays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((weekday) => (
          <div key={weekday} className="text-center text-sm font-medium  w-9">
            {weekday}
          </div>
        ))}
      </div>
    );
  };

  const renderDays = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const numDaysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      const previousMonth = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        0
      );
      const day = previousMonth.getDate() - firstDayOfMonth.getDay() + i + 1;
      const date = new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        day
      );
      const isToday = date.toDateString() === new Date().toDateString();

      const dayClass = classNames(
        "text-center rounded-full py-2 cursor-pointer",
        {
          "text-ash text-sm w-9": !isToday,
          "text-black": isToday,
        }
      );

      days.push(
        <div
          key={`empty-${i}`}
          className={dayClass}
          onClick={() => handleDateClick(date, i)}
        >
          {day}
        </div>
      );
    }

    for (let day = 1; day <= numDaysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      const dayClass = classNames(
        "text-center rounded-full py-2 cursor-pointer w-9 text-sm font-medium",
        {
          "text-gray-700": !isSelected && !isToday,
          "bg-blue-500 text-white": isSelected && !isToday,
          "text-white bg-green-500": isSelected && isToday,
          "bg-red-500 text-white": isToday,
          "text-white": isSelected && !isToday,
        }
      );

      days.push(
        <div
          key={day}
          className={dayClass}
          onClick={() => handleDateClick(date, day - 1)}
        >
          {day}
        </div>
      );
    }

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };


  return (
     <section className="max-w-2xl mx-auto pt-5 px-5 space-y-8">
      <h1 className="text-lg font-semibold md:text-2xl">OpulenceDeveloper Calender</h1>
       <div className=" overflow-x-auto whitespace-nowrap border border-ash3 rounded-tr-lg rounded-tl-lg p-5">
        {renderHeader()}
        <div className="flex justify-between mb-4">
          <div>
            <span className="font-semibold">Year:</span>
            {renderYearPicker()}
          </div>
          <div>
            <span className="font-semibold">Month:</span>
            {renderMonthPicker()}
          </div>
        </div>
        <Weekdays />
        {renderDays()}
      </div>
      </section>
  );
};

export default App;
