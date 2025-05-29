import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { TrainingMode } from '../../models/training-days';
import TrainingModeCard from './training-mode-card.vue';

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
	it('Renders collapse button', () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		expect(w.find('[data-test-id="collapse-button"').exists()).toBeTruthy();
	});
	it('Collapses', async () => {
		const w = shallowMount(TrainingModeCard, {
			props: {
				mode: TrainingMode.Three,
			},
		});
		await w.find('[data-test-id="collapse-button"').trigger('click');
		expect(w.find('[data-test-id="expand-button"').exists()).toBeTruthy();
		expect(
			w.find('[data-test-id="training-mode-description"]').exists(),
		).toBeFalsy();
		expect(
			w.find('[data-test-id="training-mode-examples"]').exists(),
		).toBeFalsy();
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
