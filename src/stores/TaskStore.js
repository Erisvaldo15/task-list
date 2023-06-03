import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore('task', () => {

    let tasks = ref([])
    let areThereError = ref(false)

    function addTask(event) {

        let keyFired = event.code.toLowerCase()

        if (keyFired) {
            areThereError.value = false
            event.target.placeholder = "Add new task"
        }

        if (keyFired === 'enter') {

            let typedValue = event.target.value

            if (typedValue) {
                areThereError.value = false
                tasks.value.push({ name: typedValue, done: false })
                return
            }

            areThereError.value = true
            event.target.placeholder = "Please, type some task"
        }

    }

    function whichTasksDoYouWantToSee(data, status, event) {

        const clickedStatus = event.target.textContent.toLowerCase()

        tasks.value = data

        status.filter((value) => value.isActivate = value.status === clickedStatus ? true : false)
    
        switch (clickedStatus) {
    
            case 'pendent':
                tasks.value = tasks.value.filter((value) => !value.done)
            break;
    
            case 'completed':
                tasks.value = tasks.value.filter((value) => value.done)
            break;
        }
    
    }

    function toggleStatusOfTask(task) {
        tasks.value.filter((value) => value.name === task.name ? value.done = !value.done : '')
    }

    function getTasksCompleted() {
        let completedTasks = tasks.value.filter((value) => value.done === true ? value : 0)
        return completedTasks.length
    }

    return { tasks, areThereError, addTask, whichTasksDoYouWantToSee, toggleStatusOfTask, getTasksCompleted }
}) 