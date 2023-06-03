<template>
    <div class="task">
        <input type="checkbox" name="task" id="task" @click="$emit('toggleTask', task)" ref="checkbox">
        <span :class="{ activate: taskData.done }" ref="taskElement">
            <slot name="task-name">
                To go to Supermaket.
            </slot>
        </span>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const checkbox = ref(null)
const taskElement = ref(null)

const task = defineProps({

    taskData: {
        type: Object,
        required: true,
    }

})

onMounted(() => checkbox.value.checked = task.taskData.done)

</script>

<style scoped>
.task {
    display: flex;
    gap: 1rem;
    background-color: rgb(214, 214, 214);
    padding: 1rem;
}

span.activate {
    text-decoration: line-through;
}

</style>