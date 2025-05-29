<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const expanded = ref(true);
</script>

<template>
	<div class="card my-1">
		<div class="card-header">
			<div class="d-flex justify-content-between">
				<h5 class="card-title" data-test-id="title">
					Expected (RPE) Rate of Perceived Exertion
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
			<table class="table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">RPE</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>0-2</td>
						<td>Very Easy</td>
					</tr>
					<tr>
						<td>3-4</td>
						<td>Easy</td>
					</tr>
					<tr>
						<td>5-6</td>
						<td>A little Hard</td>
					</tr>
					<tr>
						<td>7-8</td>
						<td>Very Hard</td>
					</tr>
					<tr>
						<td>9-10</td>
						<td>Hardest Imaginable</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
