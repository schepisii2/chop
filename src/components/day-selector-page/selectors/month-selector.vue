<script setup>
import { ref, defineEmits } from 'vue';
import { TRAINING_CALENDAR } from '../../../models/training-days';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emits = defineEmits(['set-month']);

const monthIndex = ref(0);
const months = [...new Set(TRAINING_CALENDAR.map((d) => d.month))];
</script>
<template>
	<div class="d-flex justify-content-center align-items-center">
		<font-awesome-icon
			v-if="monthIndex !== 0"
			icon="backward-step"
			data-test-id="back-button"
			@click="emits('set-month', months.at(--monthIndex))"
		/>
		<h3 class="mx-4" data-test-id="month-header">
			{{ months.at(monthIndex) }}
		</h3>
		<font-awesome-icon
			v-if="monthIndex !== months.length - 1"
			icon="forward-step"
			data-test-id="forward-button"
			@click="emits('set-month', months.at(++monthIndex))"
		/>
	</div>
</template>
