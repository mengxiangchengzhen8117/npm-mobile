import { mount } from '@vue/test-utils';
import DemoButton from '../index.tsx';

test('render demo button', () => {
  const wrapper = mount(DemoButton);
  expect(wrapper).toMatchSnapshot();
});
