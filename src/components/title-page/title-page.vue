<script setup>
import DisclaimerInformationCard from './disclaimer-information-card.vue';
import { defineEmits, ref } from 'vue';
const emits = defineEmits(['get-started']);

const showDisclaimer = ref(false);
</script>

<template>
	<disclaimer-information-card
		v-if="showDisclaimer"
		data-test-id="disclaimer-information"
		@close="showDisclaimer = false"
	/>
	<div v-else class="d-flex flex-column">
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
			@click="showDisclaimer = true"
		>
			See Disclaimer
		</button>
	</div>
</template>
