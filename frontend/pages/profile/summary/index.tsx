import { NextPage } from 'next';
import { Summary } from '../../../components/Summary/Summary';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

const SummaryPage: NextPage = () => (
  <Summary />
);

export default withAuthLayout(SummaryPage);
