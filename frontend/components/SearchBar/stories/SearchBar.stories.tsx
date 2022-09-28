/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchBar } from '../SearchBar';
import mdx from './SearchBar.docs.mdx';

export default {
  title: 'ITC/Custom/Search bar',
  component: SearchBar,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
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
