import MainView from './main-view.vue';
import {flushPromises, shallowMount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import DisclaimerInformation from '../components/disclaimer-information.vue';

describe('Disclaimer', () =>{
 it('does not show disclaimer on page load', () =>{
    const w = shallowMount(MainView);
    expect(w.find('[data-test-id="disclaimer-information"]').exists()).toBeFalsy();
 });
 it('shows disclaimer button', () => {
   const w = shallowMount(MainView);
   expect(w.find('[data-test-id="disclaimer-button"]').exists()).toBeTruthy();
 });
 it('shows disclaimer on button click', async () => {
   const w = shallowMount(MainView);
   await w.find('[data-test-id="disclaimer-button"]').trigger('click');
   expect(w.find('[data-test-id="disclaimer-information"]').exists()).toBeTruthy();
 });
 it('closes disclaimer when close emitted', async () => {
   const w = shallowMount(MainView);
   
   await w.find('[data-test-id="disclaimer-button"]').trigger('click');
   w.getComponent(DisclaimerInformation).vm.$emit('close');
   await flushPromises();
   
   expect(w.find('[data-test-id="disclaimer-information"]').exists()).toBeFalsy();
 });
});

describe('Dropdowns', () => {
   it('renders month dropdown', () => {
      const w = shallowMount(MainView);
      const expectedMonths = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8'];
      expect(w.find('[data-test-id="month-dropdown"]').exists()).toBeTruthy();
      expectedMonths.forEach((month) => {
         expect(w.find(`[data-test-id="${month}-dropdown-option"]`).exists()).toBeTruthy();
      });
   });
   it('sets selected month on click', async () => {
      const w = shallowMount(MainView);
      await w.find('[data-test-id="Month 4-dropdown-option"]').trigger('click');
      expect((w.vm as any).selectedMonth).toBe('Month 4');
   });
   it('renders day dropdown', () => {
      const w = shallowMount(MainView);
      expect(w.find('[data-test-id="day-dropdown"]').exists()).toBeTruthy();
   });
   it.skip('renders the correct amount of days for a month', async () => {
      const w = shallowMount(MainView);
      
      // Month 4 has 28 days
      await w.find('[data-test-id="Month 4-dropdown-option"]').trigger('click');
      for (let i = 1; i <= 28; i++) {
         expect(w.find(`[data-test-id="${i}-dropdown-option"]`).exists()).toBeTruthy();
      }

      // Month 2 has 35 days
      await w.find('[data-test-id="Month 2-dropdown-option"]').trigger('click');
      for (let i = 1; i <= 35; i++) {
         expect(w.find(`[data-test-id="${i}-dropdown-option"]`).exists()).toBeTruthy();
      }
   });
});

it('renders training day type', async () => {
   const w = shallowMount(MainView);

   // Month 1 - Day 1 is a rest day
   expect(w.find('[data-test-id="training-day-type"]').text()).toBe('Rest Day');

   // Month 6 - Day 1 is a cardio day
   await w.find('[data-test-id="Month 6-dropdown-option"]').trigger('click');
   expect(w.find('[data-test-id="training-day-type"]').text()).toBe('Cardio Day');

   // Month 8 - Day 1 is a strength day   
   await w.find('[data-test-id="Month 8-dropdown-option"]').trigger('click');
   expect(w.find('[data-test-id="training-day-type"]').text()).toBe('Strength Training');
});

describe('Timers', () => {
   it('renders timers cardio days', async () => {
      const w = shallowMount(MainView);
      
      // Month 1 - Day 1 is a rest day, should not render any timers
      expect(w.findAllComponents('timer-card-stub')).toHaveLength(0);

      // Month 1 - Day 2 is a cardio day, should render 5 timers 
      await w.find('[data-test-id="2-dropdown-option"]').trigger('click');
      expect(w.findAllComponents('timer-card-stub')).toHaveLength(5);
   });
   it('renders upcoming timer', async () => {
      const w = shallowMount(MainView);
      await w.find('[data-test-id="2-dropdown-option"]').trigger('click');
      expect(w.find('[data-test-id="upcoming-timer"').text()).toBe('Upcoming: 3 Minute Timer - Base Pace');
   });
   it('only shows current timer', async () => {
      const w = shallowMount(MainView);

      await w.find('[data-test-id="2-dropdown-option"]').trigger('click');
      
      expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeTruthy();
      expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeFalsy();
      expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();
      expect(w.findAllComponents('timer-card-stub')[3].isVisible()).toBeFalsy();
      expect(w.findAllComponents('timer-card-stub')[4].isVisible()).toBeFalsy();
   });
   it('updates current timer when close is emitted by timer', async () => {
      const w = shallowMount(MainView);

      await w.find('[data-test-id="2-dropdown-option"]').trigger('click');
      await w.findComponent('timer-card-stub').vm.$emit('close');
      
      // check timers display correctly
      expect(w.findAllComponents('timer-card-stub')[0].isVisible()).toBeFalsy();
      expect(w.findAllComponents('timer-card-stub')[1].isVisible()).toBeTruthy();
      expect(w.findAllComponents('timer-card-stub')[2].isVisible()).toBeFalsy();
      expect(w.findAllComponents('timer-card-stub')[3].isVisible()).toBeFalsy();
      expect(w.findAllComponents('timer-card-stub')[4].isVisible()).toBeFalsy();

      // check upcoming timer updates      
      expect(w.find('[data-test-id="upcoming-timer"').text()).toBe('Upcoming: 2 Minute Timer - Recovery');
   });
});