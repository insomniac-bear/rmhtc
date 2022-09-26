/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SignupSuccessMessage } from '../SignupSuccessMessage';
import mdx from './SignupSuccessMessage.docs.mdx';

export default {
  title: 'ITC/Signup success message',
  component: SignupSuccessMessage,
  decorators: [(story) => <div style={{ padding: '5rem', width: '500px' }}>{story()}</div>],
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
} as ComponentMeta<typeof SignupSuccessMessage>;

const Template: ComponentStory<typeof SignupSuccessMessage> = (args) => <SignupSuccessMessage {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
