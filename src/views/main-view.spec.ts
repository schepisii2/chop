import MainView from './main-view.vue';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DisclaimerInformation from '../components/disclaimer-information.vue';
import {
	ExerciseType,
	TrainingMode,
	TrainingZone,
} from '../models/training-days';

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

describe('Training Mode Card', () => {
	it('shows training mode card', async () => {
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
			mode: TrainingMode.Four,
			timers: [
				{ duration: 10, zone: TrainingZone.WarmUp },
				{ duration: 45, zone: TrainingZone.BP },
				{ duration: 10, zone: TrainingZone.CoolDown },
			],
		});

		expect(w.find('[data-test-id="training-mode-card"]').exists()).toBeTruthy();
	});
});

describe('Timers', () => {
	it('does not render timers on non-cardio days', async () => {
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

		expect(w.findAllComponents('timer-card-stub')).toHaveLength(0);
	});
	it('renders timers cardio days', async () => {
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

		expect(w.findAllComponents('timer-card-stub')).toHaveLength(3);
	});
	it('renders upcoming timer', async () => {
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

		expect(w.find('[data-test-id="upcoming-timer"]').text()).toBe(
			'Upcoming: 45 Minute Timer - Base Pace',
		);
	});
	it('does not render back button when first timer is shown', async () => {
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

		expect(w.find('[data-test-id="back-button"]').exists()).toBeFalsy();
	});
	it('renders next timer when upcoming timer is clicked', async () => {
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
		await w.find('[data-test-id="upcoming-timer"]').trigger('click');

		// check timers display correctly
		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').text()).toBe(
			'Upcoming: 10 Minute Timer - Cool Down',
		);
	});
	it('does not render upcoming timer when last timer is shown', async () => {
		const w = shallowMount(MainView);
		await (w.getComponent('[data-test-id="title-page"]') as any).vm.$emit(
			'get-started',
		);

		await (
			w.getComponent('[data-test-id="training-day-selector"') as any
		).vm.$emit('start', {
			month: 'Month 6',
			day: 21,
			type: ExerciseType.Cardio,
			mode: TrainingMode.Four,
			timers: [{ duration: 25, zone: TrainingZone.Recovery }],
		});

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').exists()).toBeFalsy();
	});
	it('renders past timer when back button clicked', async () => {
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
		await w.find('[data-test-id="upcoming-timer"]').trigger('click');
		await w.find('[data-test-id="back-button"]').trigger('click');

		// check timers display correctly
		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').text()).toBe(
			'Upcoming: 45 Minute Timer - Base Pace',
		);
	});
	it('only shows current timer', async () => {
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

		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();
	});
	it('updates current timer when close is emitted by timer', async () => {
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
		await (w.getComponent('timer-card-stub') as any).vm.$emit('close');

		// check timers display correctly
		expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeFalsy();
		expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeTruthy();
		expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();

		// check upcoming timer updates
		expect(w.find('[data-test-id="upcoming-timer"').text()).toBe(
			'Upcoming: 10 Minute Timer - Cool Down',
		);
	});
});
