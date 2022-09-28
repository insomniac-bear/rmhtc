/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Title } from '../Title';
import mdx from './Title.docs.mdx';

export default {
  title: 'ITC/Base/Title',
  component: Title,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
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
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  tag: 'h2',
  size: 's',
  children: 'I am the Title!',
};
