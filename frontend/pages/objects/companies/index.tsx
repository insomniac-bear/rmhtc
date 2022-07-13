import { NextPage } from 'next';
import { CompaniesDashboard } from '../../../components/CompaniesDashboard/CompaniesDashboard';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

const CompaniesPage: NextPage = () => (
  <CompaniesDashboard />
);

export default withAuthLayout(CompaniesPage);
