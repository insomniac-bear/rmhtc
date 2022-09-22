/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CatalogCompanyPreview } from '../CatalogCompanyPreview';
import { mockCompany } from './mokData';

export default {
  title: 'ITC/Company/Catalog company preview',
  component: CatalogCompanyPreview,
  argTypes: {
    company: {
      description: 'Объект компании',
      control: 'none',
    },
    className: {
      type: 'string',
      description: 'Дополнительные CSS-классы.',
      control: {
        type: 'none',
      },
    },
  },
} as ComponentMeta<typeof CatalogCompanyPreview>;

const Template: ComponentStory<typeof CatalogCompanyPreview> = (args) => <CatalogCompanyPreview {...args} />;

export const Playground = Template.bind({});

Playground.args = {
  company: mockCompany,
};
