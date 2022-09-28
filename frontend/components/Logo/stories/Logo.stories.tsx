/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Logo } from '../Logo';
import mdx from './Logo.docs.mdx';

export default {
  title: 'ITC/Custom/Logo',
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
  parameters: {
    docs: {
      page: mdx,
    },
  },
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
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
