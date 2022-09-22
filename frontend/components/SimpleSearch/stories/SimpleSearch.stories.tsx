/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SimpleSearch } from '../SimpleSearch';

export default {
  title: 'ITC/SimpleSearch',
  component: SimpleSearch,
  argTypes: {
    className: {
      type: 'string',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof SimpleSearch>;

const Template: ComponentStory<typeof SimpleSearch> = (args) => <SimpleSearch {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
