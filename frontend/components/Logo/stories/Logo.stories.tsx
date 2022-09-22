/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Logo } from '../Logo';

export default {
  title: 'ITC/Logo',
  component: Logo,
  decorators: [(story) => (
    <div
      style={{
        padding: '4rem',
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {story()}
    </div>
  )],
  argTypes: {
    size: {
      description: 'Настройка размера изображения (width & height), принимает числовое значение',
      defaultValue: 70,
      control: {
        type: 'number',
      },
    },
    className: {
      type: 'string',
      defaultValue: '',
      description: 'Внешний CSS класс для позиционирования элемента.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
