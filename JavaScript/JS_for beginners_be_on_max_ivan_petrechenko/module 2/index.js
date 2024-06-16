//переменные для верстки
let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
  monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
  yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
  countBtn = document.getElementsByTagName('button')[2],
  optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
  percentValue = document.querySelector('.choose-percent'),
  yearValue = document.querySelector('.year-value'),
  monthValue = document.querySelector('.month-value'),
  dayValue = document.querySelector('.day-value');

let money, time;

startBtn.addEventListener('click', function() {
  time = prompt("Введите дату в формате YYYY-MM-DD");
  money = +promptMust("Ваш бюджет на месяц?", data => !isNaN(+data));
  appData.budget = money
  appData.timeData = time
  budgetValue .textContent = money.toFixed()
  yearValue.value = new Date(Date.parse(time)).getFullYear()
  monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
  dayValue.value = new Date(Date.parse(time)).getDate()
})

expensesBtn.addEventListener('click', function() {
  let sum = 0
  for (let i = 0; i < expensesItem.length; ) {
    let name = expensesItem[i].value
    let price = expensesItem[++i].value

      if (!isNaN(price)) {
        appData.expenses[name] = parseFloat(price);
        sum += +price
        i++
      }
  }
  expensesValue.textContent = sum
})

optionalExpensesBtn.addEventListener('click', function(){
  for (let i = 0; i < optionalExpensesItem.length; i++) {
    let opt = optionalExpensesItem[i].value
    appData.optionalExpenses[i] = opt
    optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '

    // if (typeof(optExpensesName) != null && optExpensesName != '') {
    //   appData.optionalExpenses[i] = optExpensesName;
    // } else {
    //   i--
    // }
  }
})

countBtn.addEventListener('click', function() {
  if (appData.budget != undefined) {

    let sumExpenses = Object.values(appData.expenses).reduce((sum, value) => sum + value, 0)
    appData.moneyPerDay = Math.round((appData.budget - sumExpenses) / 30)
    dayBudgetValue.textContent = appData.moneyPerDay

    if (appData.moneyPerDay < 100) {
        levelValue.textContent = "Это минимальный уровень достатка!"
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        levelValue.textContent = "Это средний уровень достатка!"
    } else if (appData.moneyPerDay > 2000) {
        levelValue.textContent = "Это высокий уровень достатка!"
    } else {
        levelValue.textContent = "Нажмите 'Начать расчет'"
        dayBudgetValue.textContent = 'Нажмите "Начать расчет"'
    }
  } else {
    dayBudgetValue.textContent = 'Нажмите "Начать расчет"'
  }
})

incomeItem.addEventListener('input', function() {
  let items = incomeItem.value
  // items => isNaN(items);
  appData.income = items.split(',').map(i => i.trim())
  incomeValue.textContent = appData.income
})

checkSavings.addEventListener("click", () => {
  if (appData.savings == true) {
      appData.savings = false;
  } else {
      appData.savings = true;
  }
});

sumValue.addEventListener('input', function(){
  if (appData.savings == true) {
    let sum = +sumValue.value
    let percent = +percentValue.value
    appData.monthIncome = Math.round(sum/12/100*percent)
    appData.yearIncome = Math.round(sum/100*percent)
    monthSavingsValue.textContent = appData.monthIncome
    yearSavingsValue.textContent = appData.yearIncome
  }
})

percentValue.addEventListener('input', function(){
  if (appData.savings == true) {
    let sum = +sumValue.value
    let percent = +percentValue.value
    appData.monthIncome = Math.round(sum/12/100*percent)
    appData.yearIncome = Math.round(sum/100*percent)
    monthSavingsValue.textContent = appData.monthIncome
    yearSavingsValue.textContent = appData.yearIncome
  }
})

let appData = {
  budget: parseFloat(money),
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false
}

// promptOption спросит у пользователя title, и вызовет callback в случае, если пользователь что-то введет
// function promptOption(title, callback) {
//   let data = prompt(title)

//   if (data !== '' && data !== null) {
//     callback(data);
//   }
// }

// Спросит у пользователя title, и будет спрашивать до тех пор, пока пользователь что-то не введет
function promptMust(title, checkFn) {
  // let data = prompt(title);
  //
  // первый способ проверить на тип
  // if (type == "number" && isNaN(+data)) {
  //   return +data;
  // }
  // аналогично для других типов
  // if (type == "string" && data != null) {
  //   return data;
  // }
  // if (type == "array" && data != null && data.trim().length > 0) {
  //   return data.split(',').map(i => i.trim());
  // }

  // второй метод через вызов функции проверки
  // let data = prompt(title);
  // if (data != '' && data != null) {
  //   if (typeof checkFn == "function") {
  //     if (checkFn(data)) {
  //       return data;
  //     }
  //     // other logic when fail
  //     continue;
  //   }
  //   return data;
  // }
  while (true) {
    let data = prompt(title);

    if (data != '' && data != null) {
      if (typeof checkFn == "function") {
        if (checkFn(data)) {
          return data;
        }
        continue;
      }
      return data;
    }
  }
}