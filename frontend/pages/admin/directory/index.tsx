import { NextPage } from 'next';
import { withAuthLayout } from '../../../layouts/AuthLayout/AuthLayout';

const DirectoryPage: NextPage = () => (
  <div><h2>2</h2></div>
);

export default withAuthLayout(DirectoryPage);
