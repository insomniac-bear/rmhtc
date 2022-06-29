import { NextPage } from 'next';
import { Summary } from '../../../components/Summary/Summary';
import { withProfileLayout } from '../../../layouts/ProfileLayout/ProfileLayout';

const SummaryPage: NextPage = () => (
  <Summary />
);

export default withProfileLayout(SummaryPage);
