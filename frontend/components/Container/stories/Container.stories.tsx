/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '../Container';
import mdx from './Container.docs.mdx';

export default {
  title: 'ITC/Container',
  component: Container,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    isBackgroundLogo: {
      type: 'boolean',
      description: 'Наличие логотипа на заднем фоне',
      defaultValue: false,
      control: {
        type: 'boolean',
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
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => <Container {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  isBackgroundLogo: false,
};
