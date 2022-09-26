/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AuthMenu } from '../AuthMenu';
import mdx from './AuthMenu.docs.mdx';

export default {
  title: 'ITC/Auth menu',
  component: AuthMenu,
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
} as ComponentMeta<typeof AuthMenu>;

const Template: ComponentStory<typeof AuthMenu> = (args) => <AuthMenu {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
