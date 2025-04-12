import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TrainingDaySelector from './training-day-selector.vue';
import { ExerciseType } from '../models/training-days';

describe('Training Day Selector', () => {
	it('renders month dropdown', () => {
		const w = shallowMount(TrainingDaySelector);
		const expectedMonths = [
			'Month 1',
			'Month 2',
			'Month 3',
			'Month 4',
			'Month 5',
			'Month 6',
			'Month 7',
			'Month 8',
		];
		expect(w.find('[data-test-id="month-dropdown"]').exists()).toBeTruthy();
		expectedMonths.forEach((month) => {
			expect(
				w.find(`[data-test-id="${month}-dropdown-option"]`).exists(),
			).toBeTruthy();
		});
	});
	it('sets selected month on click', async () => {
		const w = shallowMount(TrainingDaySelector);
		await w.find('[data-test-id="Month 4-dropdown-option"]').trigger('click');
		expect((w.vm as any).selectedMonth).toBe('Month 4');
	});
	it('renders day dropdown', () => {
		const w = shallowMount(TrainingDaySelector);
		expect(w.find('[data-test-id="day-dropdown"]').exists()).toBeTruthy();
	});
	it('renders the correct amount of days for a month', async () => {
		const w = shallowMount(TrainingDaySelector);

		// Month 4 has 28 days
		await w.find('[data-test-id="Month 4-dropdown-option"]').trigger('click');
		for (let i = 1; i <= 28; i++) {
			expect(
				w.find(`[data-test-id="${i}-dropdown-option"]`).exists(),
			).toBeTruthy();
		}

		// Month 2 has 35 days
		await w.find('[data-test-id="Month 2-dropdown-option"]').trigger('click');
		for (let i = 1; i <= 35; i++) {
			expect(
				w.find(`[data-test-id="${i}-dropdown-option"]`).exists(),
			).toBeTruthy();
		}
	});
	it('renders start button', () => {
		const w = shallowMount(TrainingDaySelector);
		expect(
			w.find('[data-test-id="start-training-day-button"]').exists(),
		).toBeTruthy();
	});
	it('emits training day on button click', async () => {
		const w = shallowMount(TrainingDaySelector);
		await w.find('[data-test-id="Month 4-dropdown-option"]').trigger('click');
		await w.find('[data-test-id="start-training-day-button"]').trigger('click');
		expect(w.emitted('start')).toBeTruthy();
		expect(w.emitted('start')).toStrictEqual([
			[
				{
					month: 'Month 4',
					day: 1,
					type: ExerciseType.Rest,
				},
			],
		]);
	});
});
