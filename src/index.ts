import { v4 as uuid } from 'uuid';

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#task-form');
const input = document.querySelector<HTMLInputElement>('#task-title');

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

form?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  if (input === null) return;
  if (input.value === '' || input.value === 'null') {
    input.value = '';
    return;
  }
  console.log(input.value);

  const newTask: Task = {
    id: uuid(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  addItemToList(newTask);
  input.value = '';
});

const addItemToList = (task: Task): void => {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    if (checkbox.checked) {
      label.style.textDecoration = 'line-through';
      return;
    }
    label.style.textDecoration = 'none';
    return;
  });

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
};
