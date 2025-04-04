import MainView from './main-view.vue';
import {shallowMount} from '@vue/test-utils';
import {describe, it, expect} from 'vitest';

describe('Main page', () =>{
 it('Shows disclaimer', () =>{
    const w = shallowMount(MainView);
    expect(w.find('[data-test-id="disclaimer-message"]').exists()).toBeTruthy();
 });
});