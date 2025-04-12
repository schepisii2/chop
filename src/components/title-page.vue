<script setup>
import { defineEmits } from 'vue';
const emits = defineEmits(['get-started', 'show-disclaimer']);
</script>

<template>
	<div class="d-flex flex-column">
		<h2 class="d-flex justify-content-center my-5" data-test-id="title">
			POTS Exercise Program Timer
		</h2>
		<button
			type="button"
			class="btn btn-dark m-1"
			data-test-id="get-started-button"
			@click="emits('get-started')"
		>
			Get Started
		</button>
		<button
			type="button"
			class="btn btn-outline-dark m-1"
			data-test-id="disclaimer-button"
			@click="emits('show-disclaimer')"
		>
			See Disclaimer
		</button>
	</div>
</template>
