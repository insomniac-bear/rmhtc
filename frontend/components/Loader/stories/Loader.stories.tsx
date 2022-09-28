/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loader } from '../Loader';
import mdx from './Loader.docs.mdx';

export default {
  title: 'ITC/Base/Loader',
  component: Loader,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    style: {
      type: 'string',
      description: 'Дополнительные инлайн-стили контейнера.',
      control: {
        type: 'none',
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
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => <Loader {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
