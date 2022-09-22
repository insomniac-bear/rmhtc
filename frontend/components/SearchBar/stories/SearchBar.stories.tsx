/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBar } from '../SearchBar';

export default {
  title: 'ITC/Search bar',
  component: SearchBar,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  argTypes: {
    className: {
      type: 'string',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />;

export const Playground = Template.bind({});
