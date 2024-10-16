import { IPagination } from '@/api';
import { INodeProps } from '@/types';
// import { Pagination } from '@gravity-ui/uikit';

interface IProps extends INodeProps {
  pagination: IPagination;
}

const UIPagination = ({ pagination }: IProps) => {
  return <div> {pagination.page} </div>;
};

export default UIPagination;
