import { NextPage } from 'next';
import { CompanyCard } from '../../../components/CompanyCard/CompanyCard';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

const ModerationPage: NextPage = () => (
  <CompanyCard />
);

export default withAuthLayout(ModerationPage);
