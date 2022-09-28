/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CatalogNav } from '../CatalogNav';
import mdx from './CatalogNav.docs.mdx';

export default {
  title: 'ITC/Composite/Catalog Nav',
  component: CatalogNav,
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  parameters: {
    docs: {
      page: mdx,
    },
  },
  nextRouter: {
    pathname: '/catalog',
  },
  argTypes: {},
} as ComponentMeta<typeof CatalogNav>;

const Template: ComponentStory<typeof CatalogNav> = (args) => <CatalogNav {...args} />;

export const Playground = Template.bind({});

Playground.args = {};
