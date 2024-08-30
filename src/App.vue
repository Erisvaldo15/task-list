<template>
    <main class="tasks-manager">
        <h2> Task List ({{ taskStore.getTasksCompleted }} of {{ taskStore.tasks.length }}) </h2>
        <input type="text" name="new-task" id="new-task" placeholder="Add new task" :class="{ error: taskStore.isThereError }"
            @keypress="taskStore.addTask($event)">
        <div id="type-tasks">
            <div class="type" v-for="status in statusList" :key="`${status}Key`" 
            @click="taskStore.showSpecificTasks(data, statusList, $event)" :class="{ activate: status === taskStore.currentStatus}">
                {{ status }}
            </div>
        </div>
        <div id="tasks" v-if="taskStore.tasks.length">
            <taskItem v-for="task in taskStore.filteredTasks" :key="`${task.name}Key`" @toggle-task="taskStore.toggleStatusOfTask(task)" :task-data="task">
                <template #task-name>
                    {{ task.name }}
                </template>
            </taskItem>
        </div>
        <h4 v-else> No tasks in the moment. </h4>
    </main>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useTaskStore } from './stores/TaskStore';
import taskItem from './components/TaskItem.vue';

import data from '../tasks.json'

const taskStore = useTaskStore()

onMounted(() => {
    taskStore.tasks = data
})

const statusList = ref<string[]>(['all', 'pendent', 'done']);

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Rajdhani&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: rgb(175, 175, 175);
    --secondary-color: rgb(131, 130, 130);
}

html {
    font-size: 62.5%;
}

body {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1.8rem;
    background-color: var(--primary-color);
    height: 100vh;
}

#app {
    background-color: rgb(255, 255, 255);
    border-radius: 0.25rem;
    width: 90rem;
    height: 45rem;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 4rem;
}

.tasks-manager input[type='text'] {
    width: 100%;
    padding: 1.5rem;
    outline-color: var(--secondary-color);
    border: 0.1rem solid var(--primary-color);
    border-radius: 0.25rem;
}

input[type='text'].error {
    outline: 0.1rem solid red;
}

.tasks-manager #type-tasks {
    display: flex;
    gap: 2rem;
    margin: 2.5rem 1.25rem;
}

#type-tasks .type {
    text-transform: capitalize;
    cursor: pointer;
}

#type-tasks .type.activate {
    border-bottom: 0.15rem solid orange;
}

#tasks {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
    height: 24rem;
}

#tasks::-webkit-scrollbar {
    width: 0.5rem;
}

#tasks::-webkit-scrollbar-thumb {
    background: var(--secondary-color);
    border-radius: 99rem;
}

h2, h4 {
    text-align: center;
}

</style>