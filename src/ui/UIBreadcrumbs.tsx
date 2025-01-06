import { AppRoute } from '@/helpers/routing';
import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';

import styles from './UIBreadcrumbs.module.scss';

interface IBreadcrumb {
  link?: AppRoute;
  label: string;
}
interface IProps {
  breadcrumbs: IBreadcrumb[];
}

const UIBreadcrumbs = ({ breadcrumbs }: IProps) => {
  return (
    <Breadcrumbs>
      {breadcrumbs.map(({ label, link }, index) =>
        link && index !== breadcrumbs.length - 1 ? (
          <Link
            className={styles['link']}
            key={index}
            href={link}>
            {label}
          </Link>
        ) : (
          <span
            className={styles['current']}
            key={index}>
            {label}
          </span>
        ),
      )}
    </Breadcrumbs>
  );
};

export default UIBreadcrumbs;
