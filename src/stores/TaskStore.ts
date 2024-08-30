import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTaskStore = defineStore('task', () => {

    interface TaskModel {
        name: string,
        done: boolean,
    };

    type allowedStatus = "all" | "pendent" | "done";

    let tasks = ref<TaskModel[]>([]);
    let isThereError = ref<boolean>(false);
    let currentStatus = ref<allowedStatus>("all");

    const getTasksCompleted = computed<number>(() => tasks.value.filter((task) => task.done).length);
    const filteredTasks = computed<TaskModel[]>(() => filterTasks(currentStatus.value));

    function filterTasks(status: allowedStatus): TaskModel[] {
        switch (status) {
            case 'pendent':
                return tasks.value.filter((value) => !value.done);
            case 'done':
                return tasks.value.filter((value) => value.done);
            default:
                return tasks.value;
        }
    }

    function addTask(event: KeyboardEvent): void {

        const inputFired: HTMLInputElement | null = event.target as HTMLInputElement;

        if (event.code.toLowerCase() === "enter" && inputFired) {

            const trimmedValue = inputFired.value.trim();

            if (trimmedValue) {
                isThereError.value = false;
                tasks.value.push({ name: inputFired.value.trim(), done: false });
                inputFired.placeholder = "Add new task";
            } else {
                isThereError.value = true;
                inputFired.placeholder = "Please, type some task";
            }
        }
    }

    function showSpecificTasks(data: TaskModel[], statusList: string[], event: Event): void {

        let target = event.target as HTMLElement;

        if (target && target.textContent) {

            if (["all", "pendent", "done"].includes(target.textContent)) {

                const clickedStatus: allowedStatus = target.textContent.toLowerCase() as allowedStatus;

                tasks.value = data;

                statusList.forEach((status: string): void => {
                    if (status === clickedStatus) currentStatus.value = clickedStatus;
                })


            }
        }
    }

    function toggleStatusOfTask(chosenTask: TaskModel): void {
        const taskForChange = tasks.value.find((task: TaskModel) => task.name === chosenTask.name);
        if (taskForChange) taskForChange.done = !taskForChange.done;
    }

    return { tasks, isThereError, currentStatus, filteredTasks, getTasksCompleted, addTask, showSpecificTasks, toggleStatusOfTask }
}) 