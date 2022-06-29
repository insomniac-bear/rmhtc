import { NextPage } from 'next';
import { Title } from '../../../components/Title/Title';
import { withProfileLayout } from '../../../layouts/ProfileLayout/ProfileLayout';

const SummaryPage: NextPage = () => (
  <Title tag="h2" size="l">Personal Data Page</Title>
);

export default withProfileLayout(SummaryPage);
