import MainView from './main-view.vue';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import { ExerciseType, TrainingZone } from '../models/training-days';

describe('Title Page', () => {
	it('shows title page on page load', () => {
		const w = shallowMount(MainView);
		expect(w.find('[data-test-id="title-page"]').exists()).toBeTruthy();
	});
	it('does not show the title page when "get-started" is emitted', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);
		expect(w.find('[data-test-id="title-page"]').exists()).toBeFalsy();
	});
	it('does not show the title page when "show-disclaimer" is emitted', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'show-disclaimer',
		);
		expect(w.find('[data-test-id="title-page"]').exists()).toBeFalsy();
	});
});

describe('Breadcrumbs', () => {
	it('does not show breadcrumbs on page load', () => {
		const w = shallowMount(MainView);
		expect(w.find('[data-test-id="title-breadcrumb"]').exists()).toBeFalsy();
		expect(w.find('[data-test-id="selector-breadcrumb"]').exists()).toBeFalsy();
		expect(
			w.find('[data-test-id="selected-day-breadcrumb"]').exists(),
		).toBeFalsy();
	});
	it('show title and selector breadcrumbs when "get-started" emitted', async () => {
		const w = shallowMount(MainView);

		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);

		expect(w.find('[data-test-id="title-breadcrumb"]').exists()).toBeTruthy();
		expect(
			w.find('[data-test-id="selector-breadcrumb"]').exists(),
		).toBeTruthy();
		expect(
			w.find('[data-test-id="selected-day-breadcrumb"]').exists(),
		).toBeFalsy();
	});
	it('return to title when title breadcrumb clicked', async () => {
		const w = shallowMount(MainView);

		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);
		await w.get('[data-test-id="title-breadcrumb"]').trigger('click');

		expect(w.find('[data-test-id="title-page"]').exists()).toBeTruthy();
	});
	it('show all breadcrumbs after day selected', async () => {
		const w = shallowMount(MainView);

		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);
		await (
			w.getComponent('[data-test-id="training-day-selector"') as any
		).vm.$emit('start', {
			month: 'Month 8',
			day: 1,
			type: ExerciseType.Strength,
		});

		expect(w.find('[data-test-id="title-breadcrumb"]').exists()).toBeTruthy();
		expect(
			w.find('[data-test-id="selector-breadcrumb"]').exists(),
		).toBeTruthy();
		expect(
			w.find('[data-test-id="selected-day-breadcrumb"]').exists(),
		).toBeTruthy();
	});
	it('return to title when title breadcrumb clicked', async () => {
		const w = shallowMount(MainView);

		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);
		await (
			w.getComponent('[data-test-id="training-day-selector"') as any
		).vm.$emit('start', {
			month: 'Month 8',
			day: 1,
			type: ExerciseType.Strength,
		});
		await w.get('[data-test-id="selector-breadcrumb"]').trigger('click');

		expect(
			w.find('[data-test-id="training-day-selector"]').exists(),
		).toBeTruthy();
	});
});

describe('Disclaimer', () => {
	it('does not show disclaimer on page load', () => {
		const w = shallowMount(MainView);
		expect(
			w.find('[data-test-id="disclaimer-information"]').exists(),
		).toBeFalsy();
	});
	it('shows disclaimer when "show-disclaimer" is emitted', async () => {
		const w = shallowMount(MainView);

		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'show-disclaimer',
		);

		expect(
			w.find('[data-test-id="disclaimer-information"]').exists(),
		).toBeTruthy();
	});
	it('closes disclaimer when close emitted', async () => {
		const w = shallowMount(MainView);

		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'show-disclaimer',
		);
		w.getComponent(DisclaimerInformation).vm.$emit('close');
		await flushPromises();

		expect(
			w.find('[data-test-id="disclaimer-information"]').exists(),
		).toBeFalsy();
	});
});

describe('Training Day Selector', () => {
	it('does not show selector on page load', () => {
		const w = shallowMount(MainView);
		expect(
			w.find('[data-test-id="training-day-selector"]').exists(),
		).toBeFalsy();
	});
	it('renders selector when "get-started" is emitted', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);
		expect(
			w.find('[data-test-id="training-day-selector"]').exists(),
		).toBeTruthy();
	});
	it('renders training day type - rest day', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);

		await (
			w.getComponent('[data-test-id="training-day-selector"') as any
		).vm.$emit('start', {
			month: 'Month 1',
			day: 1,
			type: ExerciseType.Rest,
		});

		expect(w.find('[data-test-id="training-day-type"]').text()).toBe(
			'Rest Day',
		);
	});
	it('renders training day type - cardio day', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);

		await (
			w.getComponent('[data-test-id="training-day-selector"') as any
		).vm.$emit('start', {
			month: 'Month 6',
			day: 1,
			type: ExerciseType.Cardio,
			timers: [
				{ duration: 10, zone: TrainingZone.WarmUp },
				{ duration: 45, zone: TrainingZone.BP },
				{ duration: 10, zone: TrainingZone.CoolDown },
			],
		});

		expect(w.find('[data-test-id="training-day-type"]').text()).toBe(
			'Cardio Day',
		);
	});
	it('renders training day type - strength day', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);

		await (
			w.getComponent('[data-test-id="training-day-selector"') as any
		).vm.$emit('start', {
			month: 'Month 8',
			day: 1,
			type: ExerciseType.Strength,
		});

		expect(w.find('[data-test-id="training-day-type"]').text()).toBe(
			'Strength Training',
		);
	});
});
