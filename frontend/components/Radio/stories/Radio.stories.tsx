/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from '../Radio';
import mdx from './Radio.docs.mdx';

export default {
  title: 'ITC/Base/Radio',
  component: Radio,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    onChange: {
      type: 'function',
      description: 'Функция-хендлер изменения состояния',
      control: {
        type: 'none',
      },
    },
    name: {
      type: 'string',
      description: 'HTML-name инпута',
    },
    value: {
      type: 'string',
      description: 'HTML-value инпута',
    },
    errors: {
      description: 'Объект ошибок валидации',
      control: {
        type: 'none',
      },
    },
    isValidated: {
      type: 'boolean',
      description: 'Булевый модификатор, отвечает за отображение сообщения об ошибках при их наличии',
      control: {
        type: 'boolean',
      },
    },
    checked: {
      type: 'boolean',
      description: 'Атрибут checked чекбокса',
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
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  children: 'Check me',
};
