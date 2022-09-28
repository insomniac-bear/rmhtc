/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchFilter } from '../SearchFilter';
import mdx from './SearchFilter.docs.mdx';

export default {
  title: 'ITC/Filters/Search Filter',
  component: SearchFilter,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  argTypes: {
    label: {
      description: 'Отвечает за отображаемое имя поля',
    },
    placeholder: {
      description: 'Плэйсхолдер поя ввода',
    },
    fieldName: {
      description: 'Имя поля для атрибута htmlFor у label',
    },
    className: {
      type: 'string',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof SearchFilter>;

const Template: ComponentStory<typeof SearchFilter> = (args) => <SearchFilter {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  label: 'Поиск',
  placeholder: 'Введите запрос...',
  fieldName: 'category',
};
