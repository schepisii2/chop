<script setup>
import { computed, ref, defineEmits } from 'vue';
import { TRAINING_CALENDAR } from '../models/training-days';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emits = defineEmits(['start']);

const monthIndex = ref(0);
const months = [...new Set(TRAINING_CALENDAR.map((d) => d.month))];

const selectedDay = ref(1);
const days = computed(() => {
	return TRAINING_CALENDAR.filter(
		(d) => d.month === months.at(monthIndex.value),
	).map((d) => d.day);
});

const trainingDay = computed(() => {
	return getTrainingDay(selectedDay.value);
});
function getTrainingDay(day) {
	return TRAINING_CALENDAR.find(
		(d) => d.month === months.at(monthIndex.value) && d.day === day,
	);
}
</script>
<template>
	<div>
		<!-- Month Selector -->
		<div class="d-flex justify-content-center align-items-center">
			<font-awesome-icon
				v-if="monthIndex !== 0"
				icon="backward-step"
				data-test-id="back-button"
				@click="monthIndex--"
			/>
			<h3 class="mx-4" data-test-id="month-header">
				{{ months.at(monthIndex) }}
			</h3>
			<font-awesome-icon
				v-if="monthIndex !== months.length - 1"
				icon="forward-step"
				data-test-id="forward-button"
				@click="monthIndex++"
			/>
		</div>
		<!-- Day Selector -->
		<table class="table table-bordered">
			<thead class="text-center">
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
				<tr>
					<td
						v-for="day in days.slice(0, 7)"
						v-bind:key="day"
						:data-test-id="'day' + day + '-selector'"
						:class="selectedDay === day ? 'table-dark' : 'table-light'"
						@click="selectedDay = day"
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
				<tr>
					<td
						v-for="day in days.slice(7, 14)"
						v-bind:key="day"
						:data-test-id="'day' + day + '-selector'"
						:class="selectedDay === day ? 'table-dark' : 'table-light'"
						@click="selectedDay = day"
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
				<tr>
					<td
						v-for="day in days.slice(14, 21)"
						v-bind:key="day"
						:data-test-id="'day' + day + '-selector'"
						:class="selectedDay === day ? 'table-dark' : 'table-light'"
						@click="selectedDay = day"
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
				<tr>
					<td
						v-for="day in days.slice(21, 28)"
						v-bind:key="day"
						:data-test-id="'day' + day + '-selector'"
						:class="selectedDay === day ? 'table-dark' : 'table-light'"
						@click="selectedDay = day"
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
				<tr>
					<td
						v-for="day in days.slice(28, 35)"
						v-bind:key="day"
						:data-test-id="'day' + day + '-selector'"
						:class="selectedDay === day ? 'table-dark' : 'table-light'"
						@click="selectedDay = day"
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
		<div class="d-flex justify-content-center m-1">
			<button
				type="button"
				class="btn btn-dark"
				data-test-id="start-button"
				@click="emits('start', trainingDay)"
			>
				Start
			</button>
		</div>
	</div>
</template>
