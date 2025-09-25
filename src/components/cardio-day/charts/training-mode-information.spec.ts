import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { TrainingMode } from '../../../models/training-days';
import TrainingModeCard from './training-mode-information.vue';

describe('Training Mode Card', () => {
	it('Renders title', () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		expect(w.find('[data-test-id="training-mode-title"]').text()).toBe(
			'Training Mode 3',
		);
	});
	it('Renders close button', () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		expect(w.find('[data-test-id="close-button"').exists()).toBeTruthy();
	});
	it('Emits close', async () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		await w.find('[data-test-id="close-button"').trigger('click');
		expect(w.emitted('close')).toBeDefined();
	});
	it('Renders description', () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		expect(w.find('[data-test-id="training-mode-description"]').text()).toBe(
			'Upright exercise',
		);
	});
	it('Renders examples', () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		expect(w.find('[data-test-id="training-mode-examples"]').text()).toContain(
			'Elliptical (begin without arm motion)',
		);
		expect(w.find('[data-test-id="training-mode-examples"]').text()).toContain(
			'Treadmill (no incline)',
		);
	});
	it('Does not render examples if not applicable', () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Two,
			},
		});
		expect(
			w.find('[data-test-id="training-mode-examples"]').exists(),
		).toBeFalsy();
	});
});
