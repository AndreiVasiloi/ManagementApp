// import React, { useState } from "react";
// import dateFns from "date-fns";
// // import "./Calendar.css";
// const Calendar = () => {
// const [currentDate, setCurrentDate] = useState(new Date());
// const [selectedDate, setSelectedDate] = useState(new Date());
// const header = () => {
// const dateFormat = "MMMM YYYY";
// return (
//    <div className="header row flex-middle">
//       <div className="column col-start">
//          <div className="icon" onClick={prevMonth}>
//             chevron_left
//          </div>
//       </div>
//       <div className="column col-center">
//          <span>{dateFns.format(currentDate, dateFormat)}</span>
//       </div>
//       <div className="column col-end">
//          <div className="icon" onClick={nextMonth}>
//             chevron_right
//          </div>
//       </div>
//    </div>
//    );
// };
// const days = () => {
// const dateFormat = "ddd";
// const days = [];
// let startDate = dateFns.startOfWeek(currentDate);
// for (let i = 0; i < 7; i++) {
//       days.push(
//          <div className="column col-center" key={i}>
//          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
//          </div>
//       );
//    }
//    return <div className="days row">{days}</div>;
// };
// const cells = () => {
// const monthStart = dateFns.startOfMonth(currentDate);
// const monthEnd = dateFns.endOfMonth(monthStart);
// const startDate = dateFns.startOfWeek(monthStart);
// const endDate = dateFns.endOfWeek(monthEnd);
// const dateFormat = "D";
// const rows = [];
// let days = [];
// let day = startDate;
// let formattedDate = "";
// while (day <= endDate) {
//    for (let i = 0; i < 7; i++) {
//    formattedDate = dateFns.format(day, dateFormat);
//    const cloneDay = day;
// days.push(
//       <div 
//        className={`column cell ${!dateFns.isSameMonth(day, monthStart)
//        ? "disabled" : dateFns.isSameDay(day, selectedDate) 
//        ? "selected" : "" }`} 
//        key={day} 
//        onClick={() => onDateClick(dateFns.parse(cloneDay))}
//        > 
//        <span className="number">{formattedDate}</span>
//        <span className="bg">{formattedDate}</span>
//      </div>
//      );
//    day = dateFns.addDays(day, 1);
//   }
// rows.push(
//       <div className="row" key={day}> {days} </div>
//     );
//    days = [];
//  }
//  return <div className="body">{rows}</div>;
// }
// const nextMonth = () => {
//    setCurrentDate(dateFns.addMonths(currentDate, 1));
// };
// const prevMonth = () => {
//    setCurrentDate(dateFns.subMonths(currentDate, 1));
// };
// const onDateClick = day => {
// setSelectedDate(day);
// }
// return (
//    <div className="calendar">
//       <div>{header()}</div>
//       <div>{days()}</div>
//       <div>{cells()}</div>
//    </div>
//   );
// };
// export default Calendar;