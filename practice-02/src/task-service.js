function isValidId(id) {
  return typeof id === "number" && Number.isSafeInteger(id) && id > 0;
}

function normalizeTitle(title) {
  if (typeof title !== "string") {
    return { ok: false, error: "Название должно быть строкой" };
  }
  const trimmed = title.trim();
  if (trimmed.length < 1 || trimmed.length > 100) {
    return { ok: false, error: "Длина названия должна быть от 1 до 100" };
  }
  return { ok: true, title: trimmed };
}

function isValidPriority(priority) {
  return priority === "low" || priority === "medium" || priority === "high";
}

export function createTask(id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const titleResult = normalizeTitle(title);
  if (!titleResult.ok) return titleResult;
  if (!isValidPriority(priority)) {
    return { ok: false, error: "Приоритет должен быть low, medium или high" };
  }
  return {
    ok: true,
    task: { id, title: titleResult.title, completed: false, priority },
  };
}

export function findTaskById(tasks, id) {
  return tasks.find((task) => task.id === id);
}

export function getPendingTasks(tasks) {
  return tasks.filter((task) => task.completed === false);
}

export function getTaskTitles(tasks) {
  return tasks.map((task) => task.title);
}

export function getTaskStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed === true).length;
  const pending = total - completed;
  const progress = total === 0 ? 0 : completed / total * 100;
  return { total, completed, pending, progress };
}

export function addTask(tasks, id, title, priority = "medium") {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача с таким id уже существует" };
  }
  const created = createTask(id, title, priority);
  if (!created.ok) return created;
  return { ok: true, tasks: [...tasks, created.task] };
}

export function setTaskCompleted(tasks, id, completed) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (typeof completed !== "boolean") {
    return { ok: false, error: "completed должен быть boolean" };
  }
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }
  const next = tasks.map((task) =>
    task.id === id ? { ...task, completed } : task
  );
  return { ok: true, tasks: next };
}

export function renameTask(tasks, id, title) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  const titleResult = normalizeTitle(title);
  if (!titleResult.ok) return titleResult;
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }
  const next = tasks.map((task) =>
    task.id === id ? { ...task, title: titleResult.title } : task
  );
  return { ok: true, tasks: next };
}

export function removeTask(tasks, id) {
  if (!isValidId(id)) {
    return { ok: false, error: "id должен быть положительным безопасным целым" };
  }
  if (!tasks.some((task) => task.id === id)) {
    return { ok: false, error: "Задача не найдена" };
  }
  return { ok: true, tasks: tasks.filter((task) => task.id !== id) };
}