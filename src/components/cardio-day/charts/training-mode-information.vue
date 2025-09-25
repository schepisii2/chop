<script setup>
import { defineProps, computed, defineEmits } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps(['mode']);
const emits = defineEmits(['close']);

const title = computed(() => {
	if (props.mode.id === 1) {
		return 'Training Mode 1';
	}
	if (props.mode.id === 2) {
		return 'Training Mode 2';
	}
	if (props.mode.id === 3) {
		return 'Training Mode 3';
	}
	return 'Training Mode 4';
});
</script>

<template>
	<div class="card">
		<div class="card-header">
			<div class="d-flex justify-content-between">
				<h5 class="card-title" data-test-id="training-mode-title">
					{{ title }}
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
			<h6 data-test-id="training-mode-description">{{ mode.description }}</h6>
			<ul v-if="mode.examples" data-test-id="training-mode-examples">
				<li v-for="example in mode.examples" v-bind:key="example">
					{{ example }}
				</li>
			</ul>
		</div>
	</div>
</template>
