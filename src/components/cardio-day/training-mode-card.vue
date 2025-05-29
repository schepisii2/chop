<script setup>
import { defineProps, computed, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const props = defineProps(['mode']);

const expanded = ref(true);

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
			<h6 data-test-id="training-mode-description">{{ mode.description }}</h6>
			<ul v-if="mode.examples" data-test-id="training-mode-examples">
				<li v-for="example in mode.examples" v-bind:key="example">
					{{ example }}
				</li>
			</ul>
		</div>
	</div>
</template>
