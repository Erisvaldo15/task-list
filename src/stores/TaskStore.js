import { defineStore } from "pinia";
import { computed, ref } from "vue";
export const useTaskStore = defineStore('task', () => {
    ;
    let tasks = ref([]);
    let isThereError = ref(false);
    let currentStatus = ref("all");
    const getTasksCompleted = computed(() => tasks.value.filter((task) => task.done).length);
    const filteredTasks = computed(() => filterTasks(currentStatus.value));
    function filterTasks(status) {
        switch (status) {
            case 'pendent':
                return tasks.value.filter((value) => !value.done);
            case 'done':
                return tasks.value.filter((value) => value.done);
            default:
                return tasks.value;
        }
    }
    function addTask(event) {
        const inputFired = event.target;
        if (event.code.toLowerCase() === "enter" && inputFired) {
            const trimmedValue = inputFired.value.trim();
            if (trimmedValue) {
                isThereError.value = false;
                tasks.value.push({ name: inputFired.value.trim(), done: false });
                inputFired.placeholder = "Add new task";
            }
            else {
                isThereError.value = true;
                inputFired.placeholder = "Please, type some task";
            }
        }
    }
    function showSpecificTasks(data, statusList, event) {
        let target = event.target;
        if (target && target.textContent) {
            if (["all", "pendent", "done"].includes(target.textContent)) {
                const clickedStatus = target.textContent.toLowerCase();
                tasks.value = data;
                statusList.forEach((status) => {
                    if (status === clickedStatus)
                        currentStatus.value = clickedStatus;
                });
            }
        }
    }
    function toggleStatusOfTask(chosenTask) {
        const taskForChange = tasks.value.find((task) => task.name === chosenTask.name);
        if (taskForChange)
            taskForChange.done = !taskForChange.done;
    }
    return { tasks, isThereError, currentStatus, filteredTasks, getTasksCompleted, addTask, showSpecificTasks, toggleStatusOfTask };
});
