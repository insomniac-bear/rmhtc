/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CompanyLogo } from '../CompanyLogo';

export default {
  title: 'ITC/Company/CompanyLogo',
  component: CompanyLogo,
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
      description: 'Настройка размера изображения (width & height), принимает числовое значение.',
      defaultValue: 70,
      control: {
        type: 'number',
      },
    },
    alt: {
      description: 'Альтернативный текст для изображения.',
      control: {
        type: 'string',
      },
    },
    url: {
      description: 'Ссылка на изображение.',
      control: {
        type: 'string',
      },
    },
    className: {
      type: 'string',
      defaultValue: '',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof CompanyLogo>;

const Template: ComponentStory<typeof CompanyLogo> = (args) => <CompanyLogo {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  url: null,
  alt: null,
};
