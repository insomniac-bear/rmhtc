/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from '../Title';

export default {
  title: 'ITC/Title',
  component: Title,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  argTypes: {
    tag: {
      description: 'Уровень HTML заголовка, h1 - h4. Является обязательным параметром.',
      control: {
        type: 'select',
      },
    },
    size: {
      description: 'Варианты размера шрифта (font-weight). Является обязательным параметром.',
      control: {
        type: 'select',
      },
    },
    className: {
      type: 'string',
      defaultValue: '',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Small = Template.bind({});

Small.args = {
  tag: 'h2',
  size: 's',
  children: 'I am small Title!',
};

export const Medium = Template.bind({});

Medium.args = {
  tag: 'h2',
  size: 'm',
  children: 'I am medium Title!',
};

export const Large = Template.bind({});

Large.args = {
  tag: 'h2',
  size: 'l',
  children: 'I am large Title!',
};
