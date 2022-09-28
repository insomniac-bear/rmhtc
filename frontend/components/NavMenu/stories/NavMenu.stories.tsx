/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavMenu } from '../NavMenu';
import mdx from './NavMenu.docs.mdx';

export default {
  title: 'ITC/Custom/Nav Menu',
  component: NavMenu,
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
} as ComponentMeta<typeof NavMenu>;

const Template: ComponentStory<typeof NavMenu> = (args) => <NavMenu {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
