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
</script>
<template>
	<div class="py-2 px-4">
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
				<tr>
					<td
						v-for="day in days.slice(7, 14)"
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
				<tr>
					<td
						v-for="day in days.slice(14, 21)"
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
				<tr>
					<td
						v-for="day in days.slice(21, 28)"
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
				<tr>
					<td
						v-for="day in days.slice(28, 35)"
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
