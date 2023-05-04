import Button from "components/Button";
import { useState } from "react";
import uuid4 from "uuid4";
import ru from "date-fns/locale/ru";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Form = ({ addForm }) => {
  const titleForm = [
    "Продукты",
    "Транспорт",
    "Развлечения",
    "Образование",
    "Ежемесячные платежи",
    "Путешествия",
    "Прочие платежи",
  ];
  // аналог записи через функцию
  let id = uuid4();
  uuid4.valid(id);

  const [cost, setCost] = useState("");
  // const [erCost, setErrorCost] = useState("Поле не может быть пустым")
  // const [erSelectedDate, setErrorSelectedDate] = useState("Поле не может быть пустым")
  const [title, setTitle] = useState(titleForm[1]);
  const [selectedDate, setSelectedDate] = useState("");
  // const [costDirty, setCostDirty] = useState(false)
  // const [selectedDateDirty, setSelectedDateDirty] = useState(false)
  // const [disabled, setFormValid] = useState(false)

  const handleClick = (event) => {
    console.log(selectedDate);
    console.log(selectedDate, "dd MMMM yyyy", { locale: ru });
    event.preventDefault();
    const expenses = {
      id,
      title: title,
      cost: cost,
      date: selectedDate,
    };
    console.log(expenses);
    addForm(expenses);
    setCost("");
    setTitle(titleForm[1]);
    setSelectedDate("");
    /* setFormValid(false) */
  };

  /* 
const errorSelectedDate = event => {
    setSelectedDate(event.target.value)
    if (event.target.value.length < 1) {
        setErrorSelectedDate('Поле не может быть пустым')
        if(!event.target.value) {
            setErrorSelectedDate('Поле не может быть пустым')
        }
   } else {
    setErrorSelectedDate("")
   }
}

const errorCost = event => {
    setCost(event.target.value)
    if (event.target.value.length < 1) {
        setErrorCost('Поле "Сумма" не может быть пустым')
        if(!event.target.value) {
            setErrorCost('Поле Сумма не может быть пустым')
        }
   } else {
    setErrorCost("")
   }
}

const blurHandler = (event) => {
    switch (event.target.name) {
        case "cost":
            setCostDirty(true);
            break;
        case "selectedDate":
            setSelectedDateDirty(true);
            break;
default:
    }
}
 */

  return (
    <form className="max-w-sm gap-y-4 flex flex-col ml-auto mr-auto text-base text-gray-700 font-semibold">
      {/* {(costDirty && erCost) && <div className="text-rose-700 text-center">*{erCost}</div>}
    {(selectedDateDirty && erSelectedDate) && <div className="text-rose-700 text-center">*{erSelectedDate}</div>}
     */}
      <div className="grid grid-cols-3 gap-y-4">
        <div className="col-span-1">Дата</div>
        <DatePicker
          selected={selectedDate}
          /*       onBlur={event => blurHandler(event)}
      onInputClick={event => errorSelectedDate(event)} */
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd.MM.yyyy"
          maxDate={new Date()}
          className="col-span-2 border border-solid border-gray-400 rounded pl-6 pr-6 text-center"
          locale={ru}
          value={selectedDate}
          name="selectedDate"
          placeholderText="ДД.ММ.ГГГГ"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-y-4">
        <label className="col-span-1">Сумма</label>

        <input
          /*     onBlur={event => blurHandler(event)} */
          onChange={(event) => setCost(event.target.value.replace(/\D/, ""))}
          value={cost}
          name="cost"
          type="text"
          className="col-span-2 border border-solid border-gray-400 rounded text-center"
        />
      </div>

      <div className="grid grid-cols-3 gap-y-4">
        <label className="col-span-1">Вид продукта</label>
        <select
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="col-span-2 border border-solid border-gray-400 rounded text-center"
        >
          {/* <option>Рисование</option>
        <option>Программирование</option>
        <option>Психология</option>
        <option>Математика</option>
        <option>Дизайн</option> */}
          {titleForm.map((title) => {
            return <option key={title}>{title}</option>;
          })}
        </select>
      </div>

      <Button title="Добавить" handleClick={handleClick} type="submit" />
    </form>

    //const expensesJson = JSON.stringify(expenses)
    //localStorage.setItem('expenses', expensesJson)
  );
};

export default Form;
