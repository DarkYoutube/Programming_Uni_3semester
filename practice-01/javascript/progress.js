"use strict";

const totalTasks = 18;
const completedTasks = 6;

let error = "";

if (typeof totalTasks !== "number" || !Number.isFinite(totalTasks) || !Number.isInteger(totalTasks)) {
  error = "Ошибка: totalTasks должно быть целым числом";
} else if (typeof completedTasks !== "number" || !Number.isFinite(completedTasks) || !Number.isInteger(completedTasks)) {
  error = "Ошибка: completedTasks должно быть целым числом";
} else if (totalTasks < 0 || totalTasks > 1000) {
  error = "Ошибка: totalTasks вне диапазона 0..1000";
} else if (completedTasks < 0 || completedTasks > totalTasks) {
  error = "Ошибка: completedTasks вне диапазона 0..totalTasks";
}

if (error !== "") {
  console.log(error);
} else if (totalTasks === 0 && completedTasks === 0) {
  console.log("Задач пока нет");
} else {
  const remaining = totalTasks - completedTasks;
  const percentage = (completedTasks / totalTasks * 100).toFixed(1);

  let status;
  if (completedTasks === 0) {
    status = "Не начато";
  } else if (completedTasks === totalTasks) {
    status = "Завершено";
  } else {
    status = "В работе";
  }

  console.log(`Всего задач: ${totalTasks}`);
  console.log(`Выполнено: ${completedTasks}`);
  console.log(`Осталось: ${remaining}`);
  console.log(`Прогресс: ${percentage}%`);
  console.log(`Статус: ${status}`);
}