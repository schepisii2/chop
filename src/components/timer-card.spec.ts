import TimerCard from './timer-card.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { TrainingZone } from '../models/training-days';

describe('Timer Card', () => {
	it('Shows title', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
		});
		expect(w.find('[data-test-id="timer-title"]').text()).toBe(
			'10 Minute Timer - Warm Up',
		);
	});
	it('Shows time remaining', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
		});
		expect(w.find('[data-test-id="time-remaining"]').text()).toBe('10:00');
	});
	it('Shows start button', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
		});
		expect(w.find('[data-test-id="start-button"]').text()).toBe('Start');
	});
	it('Hides start button on-click', async () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
		});
		await w.get('[data-test-id="start-button"').trigger('click');
		expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
	});
	it('Emits close and shows alert when timer is up', async () => {
		vi.useFakeTimers();
		const mockAlert = vi.fn();
		window.alert = mockAlert;
		const w = shallowMount(TimerCard, {
			props: { duration: 10, zone: TrainingZone.WarmUp },
		});

		await w.get('[data-test-id="start-button"').trigger('click');
		vi.advanceTimersByTime(6000000);

		expect(w.emitted('close')).toBeDefined();
		expect(mockAlert).toHaveBeenCalled();
	});
	it('Shows zone information', () => {
		const w = shallowMount(TimerCard, {
			props: { duration: 3, zone: TrainingZone.MSS },
		});
		expect(w.find('[data-test-id="timer-title"]').text()).toBe(
			'3 Minute Timer - Maximal Steady State (MSS)',
		);
		expect(w.find('[data-test-id="heart-rate"]').text()).toBe(
			'Heart Rate: 165-175 BPM',
		);
		expect(w.find('[data-test-id="perceived-exertion"]').text()).toBe(
			'Perceived Exertion: 5-8',
		);
	});
});
