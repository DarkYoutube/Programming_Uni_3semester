"use strict";

const totalTasks = 18;
const completedTasks = 6;
const dailyLimit = 5;

let error = "";

if (typeof totalTasks !== "number" || !Number.isFinite(totalTasks) || !Number.isInteger(totalTasks)) {
  error = "Ошибка: totalTasks должно быть целым числом";
} else if (typeof completedTasks !== "number" || !Number.isFinite(completedTasks) || !Number.isInteger(completedTasks)) {
  error = "Ошибка: completedTasks должно быть целым числом";
} else if (typeof dailyLimit !== "number" || !Number.isFinite(dailyLimit) || !Number.isInteger(dailyLimit)) {
  error = "Ошибка: dailyLimit должно быть целым числом";
} else if (totalTasks < 0 || totalTasks > 1000) {
  error = "Ошибка: totalTasks вне диапазона 0..1000";
} else if (completedTasks < 0 || completedTasks > totalTasks) {
  error = "Ошибка: completedTasks вне диапазона 0..totalTasks";
} else if (dailyLimit < 1 || dailyLimit > 1000) {
  error = "Ошибка: dailyLimit вне диапазона 1..1000";
}

if (error !== "") {
  console.log(error);
} else {
  let remaining = totalTasks - completedTasks;

  if (remaining === 0) {
    console.log("Все задачи уже выполнены");
    console.log("Потребуется дней: 0");
  } else {
    console.log(`Осталось задач: ${remaining}`);

    let day = 1;
    while (remaining > 0) {
      const today = Math.min(dailyLimit, remaining);
      remaining -= today;
      console.log(`День ${day}: выполнено ${today}, осталось ${remaining}`);
      day += 1;
    }

    console.log(`Потребуется дней: ${day - 1}`);
  }
}