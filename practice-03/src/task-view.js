import { getTaskStats } from "./task-service.js";

const PRIORITY_LABELS = {
  low: "Низкий",
  medium: "Средний",
  high: "Высокий",
};

export function createTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-card");
  li.dataset.taskId = String(task.id);
  if (task.completed) {
    li.classList.add("is-completed");
  }

  const title = document.createElement("h3");
  title.classList.add("task-title");
  title.textContent = task.title;
  li.append(title);

  const status = document.createElement("span");
  status.classList.add("task-status");
  status.textContent = task.completed ? "Выполнена" : "В работе";
  li.append(status);

  const priority = document.createElement("span");
  priority.classList.add("task-priority");
  priority.textContent = PRIORITY_LABELS[task.priority] ?? task.priority;
  li.append(priority);

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.dataset.action = "toggle";
  toggle.setAttribute("aria-pressed", String(task.completed));
  const toggleLabel = document.createElement("span");
  toggleLabel.classList.add("action-label");
  toggleLabel.textContent = "Выполнена";
  toggle.append(toggleLabel);
  actions.append(toggle);

  const del = document.createElement("button");
  del.type = "button";
  del.dataset.action = "delete";
  const delLabel = document.createElement("span");
  delLabel.classList.add("action-label");
  delLabel.textContent = "Удалить";
  del.append(delLabel);
  actions.append(del);

  li.append(actions);
  return li;
}

export function renderTaskList(listElement, tasks) {
  const cards = tasks.map((task) => createTaskElement(task));
  listElement.replaceChildren(...cards);
}

export function renderSummary(summaryElement, tasks, visibleCount) {
  const { total, completed, pending, progress } = getTaskStats(tasks);
  const set = (name, value) => {
    const node = summaryElement.querySelector(`[data-stat="${name}"]`);
    if (node) node.textContent = value;
  };
  set("total", String(total));
  set("completed", String(completed));
  set("pending", String(pending));
  set("progress", `${progress.toFixed(1)}%`);
  set("visible", String(visibleCount));
}

export function renderEmptyState(messageElement, total, visibleCount) {
  if (visibleCount > 0) {
    messageElement.textContent = "";
    messageElement.hidden = true;
    return;
  }
  messageElement.hidden = false;
  if (total === 0) {
    messageElement.textContent = "Список задач пуст.";
  } else {
    messageElement.textContent = "Нет задач по выбранному фильтру.";
  }
}