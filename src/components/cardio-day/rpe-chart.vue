<script setup>
import { defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const emits = defineEmits(['close']);
</script>

<template>
	<div class="card my-1">
		<div class="card-header">
			<div class="d-flex justify-content-between">
				<h5 class="card-title" data-test-id="title">
					Expected (RPE) Rate of Perceived Exertion
				</h5>
				<font-awesome-icon
					icon="square-xmark"
					size="2x"
					data-test-id="close-button"
					@click="emits('close')"
				/>
			</div>
		</div>
		<div class="card-body">
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
