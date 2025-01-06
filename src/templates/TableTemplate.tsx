import type { IPagination } from '@/app/api';
import type { IIdentifiable, INodeProps } from '@/types';
import { Button, Drawer, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';

import styles from './TableTemplate.module.scss';
import UIIcon from '@/ui/UIIcon';

interface IProps<T extends IIdentifiable> extends INodeProps {
  headers: (keyof T)[];
  data: T[] | undefined;
  formatters?: { [key in keyof T]?: (value: T[keyof T]) => string };
  pagination: IPagination;
  per?: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  formComponent: (toggleDrawer: () => void, item?: T) => React.ReactNode;
}

const TableTemplate = <T extends IIdentifiable>({
  data,
  headers,
  formatters = {},
  pagination,
  per,
  onPageChange,
  onRowsPerPageChange,
  formComponent,
}: IProps<T>) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(undefined);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Button
        variant="outlined"
        title="Создать"
        onClick={() => (setSelected(undefined), setIsDrawer(true))}>
        <UIIcon name="add" />
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(h => (
              <TableCell
                align="right"
                key={String(h)}>
                {String(h)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow
              onClick={() => (setSelected(item), setIsDrawer(true))}
              key={item.id}>
              {headers.map(key => (
                <TableCell
                  key={item.id + key.toString()}
                  align="right">
                  {String(formatters[key] ? formatters[key](item[key]) : item[key])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 20]}
        rowsPerPage={per || 10}
        component={'div'}
        count={pagination.total}
        page={pagination.page - 1}
        onPageChange={(_, p) => onPageChange(p + 1)}
        onRowsPerPageChange={e => onRowsPerPageChange?.(Number(e.target.value))}
      />
      <Drawer
        className={styles['drawer']}
        sx={{ padding: '16px 32px' }}
        open={isDrawer}
        onClose={() => (setSelected(undefined), setIsDrawer(false))}
        anchor="right">
        {formComponent(() => (setSelected(undefined), setIsDrawer(false)), selected)}
      </Drawer>
    </>
  );
};

export default TableTemplate;
