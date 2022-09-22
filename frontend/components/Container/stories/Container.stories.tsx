/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Container } from '../Container';

export default {
  title: 'ITC/Container',
  component: Container,
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

export const Default = Template.bind({});

Default.args = {};

export const WithLogo = Template.bind({});

WithLogo.args = {
  style: { minHeight: '500px' }, // Чтобы было видно лого
  isBackgroundLogo: true,
};
