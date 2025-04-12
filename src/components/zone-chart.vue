<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const expanded = ref(true);
</script>

<template>
	<div class="card my-2">
		<div class="card-header">
			<div class="d-flex justify-content-between">
				<h5 class="card-title" data-test-id="title">Workout Zones</h5>
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
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Training Zone</th>
						<th scope="col">Heart Rate (BPM) Beats Per Minute</th>
						<th scope="col">Expected (RPE) Rating of Perceived Exertion</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Base Pase (BP)</td>
						<td>125-145</td>
						<td>2-4</td>
					</tr>
					<tr>
						<td>Maximal Steady State (MSS)</td>
						<td>165-175</td>
						<td>5-8</td>
					</tr>
					<tr>
						<td>Race Pace (RP)</td>
						<td>170-185</td>
						<td>7-9</td>
					</tr>
					<tr>
						<td>Recovery</td>
						<td>less than 125</td>
						<td>0-2</td>
					</tr>
				</tbody>
			</table>
			<p>
				Heart rate zones may vary based on age. Heart rate zones are not a
				reliable indicator for those taking beta blockers. Use the RPE scale and
				the not the heart rate scale for your training zone if needed.
			</p>
		</div>
	</div>
</template>
