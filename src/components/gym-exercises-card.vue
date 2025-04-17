<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps(['mode']);

const expanded = ref(true);

const exercises = [
'Seated leg press',
'Leg curl',
'Leg extension',
'Calf raise',
'Chest press',
'Seated row'
];
</script>

<template>
        <div class="card">
                <div class="card-header">
                        <div class="d-flex justify-content-between">
                                <h5 class="card-title" data-test-id="title">
                                        Recommended Strength Exercises - Fitness Center
                                </h5>
                                <font-awesome-icon
                                        v-if="expanded"
                                        icon="square-minus"
                                        size="2x"
                                        data-test-id="collapse-button"
                                        @click="expanded = false"
                                />
                                <font-awesome-icon
                                        v-else
                                        icon="square-plus"
                                        size="2x"
                                        data-test-id="expand-button"
                                        @click="expanded = true"
                                />
                        </div>
                </div>
                <div class="card-body" v-if="expanded">
                        <p data-test-id="description">Perform 3 sets of 8-10 repetitions of each exercise below. On your third set, perform as many repetitions as you can. If you can perform more than 10 repetitions, then increase the amount of weight you lift for the exercise during your next strength training session.</p>
                        <ul data-test-id="exercises">
                                <li v-for="exercise in exercises" v-bind:key="exercise">
                                        {{ exercise }}
                                </li>
                        </ul>
                </div>
        </div>
</template>