/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SectionTitle } from '../SectionTitle';

export default {
  title: 'ITC/Section title',
  component: SectionTitle,
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
} as ComponentMeta<typeof SectionTitle>;

const Template: ComponentStory<typeof SectionTitle> = (args) => <SectionTitle {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Some text',
};
