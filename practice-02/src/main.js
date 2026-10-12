import { demoTasks, variantNumber, variantTasks } from "./data.js";
import {
  getPendingTasks,
  getTaskTitles,
  getTaskStats,
  addTask,
  setTaskCompleted,
  renameTask,
  removeTask,
} from "./task-service.js";

function printStats(label, tasks) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  if (total === 0) {
    console.log(`${label}: задач пока нет`);
  } else {
    console.log(`${label}: всего ${total}, выполнено ${completed}, осталось ${pending}, прогресс ${progress.toFixed(1)}%`);
  }
}

function apply(result, label) {
  if (result.ok) {
    console.log(`OK: ${label}`);
    return result.tasks;
  }
  console.error(`Ошибка (${label}): ${result.error}`);
  return null;
}

console.log("=== Общий сценарий ===");
let current = demoTasks;
console.log("Названия:", getTaskTitles(current));
console.log("Невыполненные id:", getPendingTasks(current).map((t) => t.id));
printStats("Исходно", current);

let r = addTask(current, 20, "Добавить проверку", "high");
let next = apply(r, "добавление id 20");
if (next) current = next;
printStats("После добавления", current);

r = setTaskCompleted(current, 4, true);
next = apply(r, "выполнение id 4");
if (next) current = next;
printStats("После выполнения id 4", current);

r = renameTask(current, 10, "Подготовить инструкцию запуска");
next = apply(r, "переименование id 10");
if (next) current = next;
printStats("После переименования id 10", current);

r = removeTask(current, 7);
next = apply(r, "удаление id 7");
if (next) current = next;
printStats("После удаления id 7", current);

console.log("Итоговые id:", current.map((t) => t.id));

r = addTask(current, 20, "Дубликат");
if (!r.ok) console.error(`Ожидаемая ошибка: ${r.error}`);
console.log("demoTasks после сценария:", demoTasks.map((t) => t.id));

console.log("\n=== Индивидуальный вариант ===");
console.log("Номер варианта:", variantNumber);
let v = variantTasks;
console.log("Исходные id:", v.map((t) => t.id));
printStats("Вариант исходно", v);

r = addTask(v, 80, "Проверить мобильную версию", "low");
next = apply(r, "добавление id 80");
if (next) v = next;
printStats("После добавления id 80", v);

r = setTaskCompleted(v, 11, true);
next = apply(r, "выполнение id 11");
if (next) v = next;

r = renameTask(v, 23, "Проверить навигацию и меню");
next = apply(r, "переименование id 23");
if (next) v = next;

r = removeTask(v, 37);
next = apply(r, "удаление id 37");
if (next) v = next;

printStats("Вариант итого", v);
console.log("Итоговые id варианта:", v.map((t) => t.id));

r = addTask(v, 80, "Повтор");
if (!r.ok) console.error(`Ожидаемая ошибка: ${r.error}`);
console.log("variantTasks после сценария:", variantTasks.map((t) => t.id));