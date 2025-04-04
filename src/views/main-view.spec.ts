import MainView from './main-view.vue';
import {flushPromises, shallowMount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';
import DisclaimerInformation from '../components/disclaimer-information.vue';

describe('Main page', () =>{
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