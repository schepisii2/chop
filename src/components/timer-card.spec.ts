import TimerCard from './timer-card.vue';
import {shallowMount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';

describe('Timer Card', () =>{
 it('Shows title', () => {
    const w = shallowMount(TimerCard, { props: {duration: 10}});
    expect(w.find('[data-test-id="timer-title"]').text()).toBe('10 Minute Timer');
 });
 it('Emits close on-click', async () => {
    const w = shallowMount(TimerCard);
    await w.find('[data-test-id="close-button"]').trigger('click');
    expect(w.emitted('close')).toBeDefined();
 });
 it('Shows time remaining', () => {
   const w = shallowMount(TimerCard, { props: {duration: 10}});
   expect(w.find('[data-test-id="time-remaining"]').text()).toBe('10:00');
});
});