import TimerCard from './timer-card.vue';
import {shallowMount} from '@vue/test-utils';
import {describe, it, expect, vi} from 'vitest';

describe('Timer Card', () =>{
 it('Shows title', () => {
    const w = shallowMount(TimerCard, { props: {duration: 10}});
    expect(w.find('[data-test-id="timer-title"]').text()).toBe('10 Minute Timer');
 });
 it('Shows time remaining', () => {
   const w = shallowMount(TimerCard, { props: {duration: 10}});
   expect(w.find('[data-test-id="time-remaining"]').text()).toBe('10:00');
 });
 it('Shows start button', () => {   
   const w = shallowMount(TimerCard, { props: {duration: 10}});
   expect(w.find('[data-test-id="start-button"]').text()).toBe('Start');
 });
 it('Hides start button on-click', async () => {   
   const w = shallowMount(TimerCard, { props: {duration: 10}});
   await w.get('[data-test-id="start-button"').trigger('click');
   expect(w.find('[data-test-id="start-button"]').exists()).toBeFalsy();
 });
 it('Emits close and shows alert when timer is up', async () => {  
   vi.useFakeTimers()
   const mockAlert = vi.fn()
   window.alert = mockAlert; 
   const w = shallowMount(TimerCard, { props: {duration: 10}});

   await w.get('[data-test-id="start-button"').trigger('click');
   vi.advanceTimersByTime(6000000);

   expect(w.emitted('close')).toBeDefined();
   expect(mockAlert).toHaveBeenCalled();
 });
});