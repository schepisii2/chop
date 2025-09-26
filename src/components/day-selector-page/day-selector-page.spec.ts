import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DaySelectorPage from './day-selector-page.vue';
import { ExerciseType } from '../../models/training-days';

describe('Training Day Selector', () => {
	it('renders month selector', () => {
		const w = shallowMount(DaySelectorPage);
		expect(w.findComponent('month-selector-stub').exists()).toBeTruthy();
	});
	it('renders day selector', () => {
		const w = shallowMount(DaySelectorPage);
		expect(w.findComponent('day-selector-stub').exists()).toBeTruthy();
	});
	it('renders start button', () => {
		const w = shallowMount(DaySelectorPage);
		expect(w.find('[data-test-id="start-button"]').exists()).toBeTruthy();
	});
	it('emits training day on button click', async () => {
		const w = shallowMount(DaySelectorPage);

		await (w.getComponent('month-selector-stub') as any).vm.$emit(
			'set-month',
			'Month 2',
		);
		await (w.getComponent('day-selector-stub') as any).vm.$emit('set-day', 14);
		await w.find('[data-test-id="start-button"]').trigger('click');

		expect(w.emitted('start')).toBeTruthy();
		expect(w.emitted('start')).toStrictEqual([
			[
				{
					month: 'Month 2',
					day: 14,
					type: ExerciseType.Rest,
				},
			],
		]);
	});
});
