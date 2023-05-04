import Product from "components/Product";
import Form from "components/Form";
import uuid4 from "uuid4";
import { useState } from "react";
import Diagram from "components/Diagram";

function App() {
  let id = uuid4();
  uuid4.valid(id);

  const titleForm = [
    "Продукты",
    "Транспорт",
    "Развлечения",
    "Образование",
    "Ежемесячные платежи",
    "Путешествия",
    "Прочие платежи",
  ];
  const [expenses, setExpenses] = useState([
    {
      id: uuid4(),
      date: new Date(2023, 0, 28),
      title: "Продукты",
      cost: 550,
    },
    {
      id: uuid4(),
      date: new Date(2023, 1, 18),
      title: "Транспорт",
      cost: 4405,
    },
    {
      id: uuid4(),
      date: new Date(2023, 0, 10),
      title: "Развлечения",
      cost: 4900,
    },
    {
      id: uuid4(),
      date: new Date(2023, 2, 20),
      title: "Образование",
      cost: 12000,
    },
    {
      id: uuid4(),
      date: new Date(2023, 1, 30),
      title: "Продукты",
      cost: 12000,
    },
    {
      id: uuid4(),
      date: new Date(2023, 0, 30),
      title: "Ежемесячные платежи",
      cost: 16000,
    },
    {
      id: uuid4(),
      date: new Date(2023, 0, 30),
      title: "Прочие платежи",
      cost: 6000,
    },
    {
      id: uuid4(),
      date: new Date(2023, 0, 20),
      title: "Путешествия",
      cost: 5000,
    },
  ]);

  function deleteExpenses(id) {
    const filtredExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(filtredExpenses);
  }

  const addExpenses = (exp) => {
    setExpenses([...expenses, exp]);
  };
  const [filterTitle, setFilterTitle] = useState();

  const data = [
    {
      name: "Продукты",
      cost: expenses
        .filter((exp) => exp.title === "Продукты")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
    {
      name: "Транспорт",
      cost: expenses
        .filter((exp) => exp.title === "Транспорт")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
    {
      name: "Развлечения",
      cost: expenses
        .filter((exp) => exp.title === "Развлечения")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
    {
      name: "Образование",
      cost: expenses
        .filter((exp) => exp.title === "Образование")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
    {
      name: "Прочие платежи",
      cost: expenses
        .filter((exp) => exp.title === "Прочие платежи")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
    {
      name: "Ежемесячные платежи",
      cost: expenses
        .filter((exp) => exp.title === "Ежемесячные платежи")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
    {
      name: "Путешествия",
      cost: expenses
        .filter((exp) => exp.title === "Путешествия")
        .reduce((acc, exp) => acc + Number(exp.cost), 0),
    },
  ];

  const filtredCost =
    filterTitle === "Все расходы" || !filterTitle
      ? expenses
      : expenses.filter((exp) => exp.title === filterTitle);

  return (
    <div className="max-w-5xl w-full mx-auto">
      <div className="bg-[#ebf1dd] rounded-3xl shadow-lg opacity-95 p-3">
        <h1 className="p-10 text-center text-[#07618C] text-4xl font-semibold">
          Учет расходов
        </h1>

        <div className="">
          <Form addForm={addExpenses} />
          <div className="grid grid-cols-2 gap-12 mt-5 mb-5">
            <div className="flex flex-row justify-center p-1">
              <Diagram data={data} />
            </div>
            <div className="text-xl text-gray-600 p-3 mr-10">
              {titleForm.map((title) => (
                <div className="flex flex-col justify-start gap-y-2">
                  <div className="text-md text-gray-700 bg-[#ecbcbc] pr-2 pl-2 pt-1 pb-1 mt-3 rounded-full flex flex-row cursor-pointer">
                    {/*   <p className="pl-2">{title}</p>
                            <p className=""> : {setExpenses} руб.</p> */}
                    <p onClick={() => setFilterTitle(title)} className="pl-2">
                      {title}:{" "}
                      {new Intl.NumberFormat("ru-RU").format(
                        expenses
                          .filter((exp) => exp.title === title)
                          .reduce((acc, exp) => acc + Number(exp.cost), 0)
                      )}{" "}
                      руб.
                    </p>
                  </div>{" "}
                </div>
              ))}
              <div className="text-md text-gray-700 bg-[#ecbcbc] pr-2 pl-2 pt-1 pb-1 mt-3 rounded-full flex flex-row cursor-pointer">
                <p
                  onClick={() => setFilterTitle()}
                  className="pl-2 font-semibold"
                >
                  Все расходы -{" "}
                  {new Intl.NumberFormat("ru-RU").format(
                    expenses.reduce((acc, exp) => acc + Number(exp.cost), 0)
                  )}{" "}
                  руб.
                </p>
              </div>
            </div>
          </div>
        </div>

        {filtredCost.length === 0 && (
          <div className="p-20 text-center text-7xl text-gray-500 font-thin">
            В ЭТОЙ КАТНГОРИИ НЕТ РАСХОДОВ{" "}
          </div>
        )}

        {expenses.length > 0 &&
          filtredCost.map((exp) => {
            return (
              <Product key={exp.id} exp={exp} deleteExpenses={deleteExpenses} />
            );
          })}
      </div>
    </div>
  );
}

export default App;
