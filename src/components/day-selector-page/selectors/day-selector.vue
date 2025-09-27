<script setup>
import { computed, ref, defineProps, defineEmits } from 'vue';
import { TRAINING_CALENDAR } from '../../../models/training-days';

const props = defineProps(['month']);
const emits = defineEmits(['set-day']);

const selectedDay = ref(1);
const days = computed(() => {
	return TRAINING_CALENDAR.filter((d) => d.month === props.month).map(
		(d) => d.day,
	);
});

function setDay(day) {
	selectedDay.value = day;
	emits('set-day', day);
}

function getTrainingDay(day) {
	return TRAINING_CALENDAR.find(
		(d) => d.month === props.month && d.day === day,
	);
}

const useMiniSelector = computed(() => {
	if (window.innerWidth && window.innerWidth > 500) {
		return false;
	}
	return true;
});
</script>
<template>
	<div class="py-2 px-4">
		<div v-if="useMiniSelector">
			<table class="table table-bordered text-center h-75">
				<thead data-test-id="table-headers">
					<tr>
						<th scope="col">S</th>
						<th scope="col">M</th>
						<th scope="col">T</th>
						<th scope="col">W</th>
						<th scope="col">T</th>
						<th scope="col">F</th>
						<th scope="col">S</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="i in 5" v-bind:key="i">
						<td
							v-for="day in days.slice((i - 1) * 7, i * 7)"
							v-bind:key="day"
							:data-test-id="'day' + day + '-selector'"
							:class="selectedDay === day ? 'table-dark' : 'table-light'"
							@click="setDay(day)"
						>
							{{ day }}
						</td>
					</tr>
				</tbody>
			</table>
			<div
				data-test-id="day-information-alert"
				class="alert alert-dark"
				role="alert"
			>
				<strong>Day {{ selectedDay }}</strong>
				<div>{{ getTrainingDay(selectedDay).type }}</div>
				<div v-if="getTrainingDay(selectedDay).type === 'Cardio Day'">
					<div>Training Mode {{ getTrainingDay(selectedDay).mode.id }}</div>
					<ul>
						<li
							v-for="timer in getTrainingDay(selectedDay).timers"
							v-bind:key="timer"
						>
							{{ timer.duration }} min {{ timer.zone.label }}
						</li>
					</ul>
				</div>
			</div>
		</div>
		<table v-else class="table table-bordered">
			<thead data-test-id="table-headers" class="text-center">
				<tr>
					<th scope="col">Sun</th>
					<th scope="col">Mon</th>
					<th scope="col">Tues</th>
					<th scope="col">Wed</th>
					<th scope="col">Thurs</th>
					<th scope="col">Fri</th>
					<th scope="col">Sat</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="i in 5" v-bind:key="i">
					<td
						v-for="day in days.slice((i - 1) * 7, i * 7)"
						v-bind:key="day"
						:data-test-id="'day' + day + '-selector'"
						:class="selectedDay === day ? 'table-dark' : 'table-light'"
						@click="setDay(day)"
					>
						<div>{{ day }}</div>
						<div class="text-center">
							<strong>{{ getTrainingDay(day).type }}</strong>
							<div v-if="getTrainingDay(day).type === 'Cardio Day'">
								<div
									v-for="timer in getTrainingDay(day).timers"
									v-bind:key="timer"
								>
									{{ timer.duration }} min {{ timer.zone.label }}
								</div>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
