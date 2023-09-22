import { mount } from '@vue/test-utils';
import ScaleButton from '../index.tsx';

test('render demo button', () =>
{
  const wrapper = mount(ScaleButton);
  expect(wrapper).toMatchSnapshot();
});
