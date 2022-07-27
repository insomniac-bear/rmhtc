import { NextPage } from 'next';
import { ModerationCardList } from '../../../components/ModerationCardList/ModerationCardList';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

const ModerationPage: NextPage = () => (
  <ModerationCardList />
);

export default withAuthLayout(ModerationPage);
