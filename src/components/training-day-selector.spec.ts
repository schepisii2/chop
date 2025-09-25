import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TrainingDaySelector from './training-day-selector.vue';
import { ExerciseType } from '../models/training-days';

describe('Training Day Selector', () => {
	it('renders Month 1 selected on page load', () => {
		const w = shallowMount(TrainingDaySelector);

		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 1');
	});
	it('does not render back button when Month 1 is selected', async () => {
		const w = shallowMount(TrainingDaySelector);
		expect(w.find('[data-test-id="back-button"]').exists()).toBeFalsy();
	});
	it('selects next month when forward button is clicked', async () => {
		const w = shallowMount(TrainingDaySelector);
		await w.find('[data-test-id="forward-button"]').trigger('click');
		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 2');
	});
	it('selects previous month when back button is clicked', async () => {
		const w = shallowMount(TrainingDaySelector);
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="back-button"]').trigger('click');
		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 1');
	});
	it('does not render forward button when Month 8 is selected', async () => {
		const w = shallowMount(TrainingDaySelector);

		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="forward-button"]').trigger('click');

		expect(w.find('[data-test-id="month-header"]').text()).toBe('Month 8');
		expect(w.find('[data-test-id="forward-button"]').exists()).toBeFalsy();
	});
	it('renders cardio day with timers', () => {
		const w = shallowMount(TrainingDaySelector);

		// Rest Day does not have timers
		expect(w.find('[data-test-id="day1-selector"]').text()).toBe('1Rest Day');
		// Cardio Day does have timers
		expect(w.find('[data-test-id="day2-selector"]').text()).toBe(
			'2Cardio Day10 min Warm Up3 min Base Pace2 min Recovery3 min Base Pace10 min Cool Down',
		);
	});
	it('renders the correct amount of days for a month', async () => {
		const w = shallowMount(TrainingDaySelector);

		// Month 2 has 35 days
		await w.find('[data-test-id="forward-button"]').trigger('click');
		for (let i = 1; i <= 35; i++) {
			expect(w.find(`[data-test-id="day${i}-selector"]`).exists()).toBeTruthy();
		}

		// Month 4 has 28 days
		await w.find('[data-test-id="forward-button"]').trigger('click'); // Month 3
		await w.find('[data-test-id="forward-button"]').trigger('click'); // Month 4
		for (let i = 1; i <= 28; i++) {
			expect(w.find(`[data-test-id="day${i}-selector"]`).exists()).toBeTruthy();
		}
	});
	it('renders start button', () => {
		const w = shallowMount(TrainingDaySelector);
		expect(w.find('[data-test-id="start-button"]').exists()).toBeTruthy();
	});
	it('emits training day on button click', async () => {
		const w = shallowMount(TrainingDaySelector);

		await w.find('[data-test-id="forward-button"]').trigger('click');
		await w.find('[data-test-id="day14-selector"]').trigger('click');
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
