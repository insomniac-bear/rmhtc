/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../Button';
import mdx from './Button.docs.mdx';

export default {
  title: 'ITC/Base/Button',
  component: Button,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    type: {
      description: 'HTML тип кнопки',
      control: {
        type: 'select',
      },
    },
    appearance: {
      description: 'Заливка, либо только граница, либо полная заливка',
      control: {
        type: 'select',
      },
    },
    disabled: {
      description: 'Состояние disabled',
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      description: 'Функция-обработчик события click',
      type: 'function',
    },
    className: {
      type: 'string',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  type: 'button',
  children: 'Click me',
};
