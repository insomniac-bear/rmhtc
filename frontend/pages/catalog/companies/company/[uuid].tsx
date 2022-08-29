import { NextPage } from 'next';
import { CompanyCard } from '../../../../components/CompanyCard/CompanyCard';
import { withAuthLayout } from '../../../../layouts/AuthLayout/AuthLayout';

const CompanyPage: NextPage = () => (
  <div>
    <CompanyCard access="general" />
  </div>
);
export default withAuthLayout(CompanyPage);
