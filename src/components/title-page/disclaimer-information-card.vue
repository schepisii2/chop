<script setup>
import { defineEmits } from 'vue';
defineEmits(['close']);
</script>

<template>
	<div class="card">
		<div class="card-header">
			<div class="d-flex justify-content-between">
				<h5 class="card-title">Disclaimer</h5>
				<button
					type="button"
					class="btn-close"
					aria-label="Close"
					data-test-id="close-button"
					@click="$emit('close')"
				></button>
			</div>
		</div>
		<div class="card-body">
			<p class="card-text" data-test-id="disclaimer-message">
				Information found on this site is based off the POTS Exercise Program
				detailed in the PDF below. This site is not affliated with the
				Children's Hospital of Philadelphia or the researchers involved in the
				development of this program. The purpose of this site is to function as
				an aid for those following the program below. Any questions about
				involvement with the program should be directed to a medical
				professional.
			</p>
			<object
				data-test-id="chop-pdf"
				data="https://www.dysautonomiainternational.org/pdf/CHOP_Modified_Dallas_POTS_Exercise_Program.pdf"
				type="application/pdf"
				width="100%"
				height="500px"
			>
				<p>
					Unable to display PDF file.
					<a
						href="https://www.dysautonomiainternational.org/pdf/CHOP_Modified_Dallas_POTS_Exercise_Program.pdf"
						>Download</a
					>
					instead.
				</p>
			</object>
		</div>
	</div>
</template>
