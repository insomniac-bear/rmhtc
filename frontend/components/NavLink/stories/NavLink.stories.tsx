/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { NavLink } from '../NavLink';
import './NavLinkExample.css';
import mdx from './NavLink.docs.mdx';

export default {
  title: 'ITC/Nav Link',
  component: NavLink,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  nextRouter: {
    path: '/',
  },
  argTypes: {
    href: {
      type: 'string',
      description: 'Внутренняя навигационная ссылка сайта.',
    },
    exact: {
      type: 'string',
      description: 'Модификатор сравнения ссылок - глубокое/не глубокое.',
      control: {
        type: 'boolean',
      },
    },
    activeClass: {
      type: 'string',
      description: 'CSS-класс для активной ссылки.',
      control: {
        type: 'string',
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
} as ComponentMeta<typeof NavLink>;

const Template: ComponentStory<typeof NavLink> = (args) => <NavLink {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  href: '/',
  children: 'Link to Home',
  className: 'link',
  activeClass: 'link_active',
  exact: true,
};
