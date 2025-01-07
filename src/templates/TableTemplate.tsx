import type { IPagination } from '@/app/api';
import type { IIdentifiable, INodeProps } from '@/types';
import {
  Button,
  Drawer,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';

import styles from './TableTemplate.module.scss';
import UIIcon from '@/ui/UIIcon';

interface IProps<T extends IIdentifiable> extends INodeProps {
  headers: [key: keyof T, label: string][];
  data: T[] | undefined;
  formatters?: { [key in keyof T]?: (value: T[keyof T]) => string };
  pagination: IPagination;
  deletable?: boolean;
  isLoading?: boolean;
  per?: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  onDelete?: (id: string) => void;
  formComponent: (toggleDrawer: () => void, item?: T) => React.ReactNode;
}

const TableTemplate = <T extends IIdentifiable>({
  data,
  headers,
  formatters = {},
  pagination,
  per,
  deletable = false,
  isLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onDelete,
  formComponent,
}: IProps<T>) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [selected, setSelected] = useState<T | undefined>(undefined);

  const [isConfirmModal, setIsConfirmModal] = useState(false);

  if (!data || isLoading) return <div>Загрузка...</div>;

  return (
    <>
      <Tooltip title="Добавить">
        <IconButton onClick={() => (setSelected(undefined), setIsDrawer(true))}>
          <UIIcon name="add" />
        </IconButton>
      </Tooltip>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map(([key, label]) => (
              <TableCell
                align="right"
                key={key.toString()}>
                {String(label)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow
              className={styles['row']}
              onClick={() => (setSelected(item), setIsDrawer(true))}
              key={item.id}>
              {headers.map(([key]) => (
                <TableCell
                  key={item.id + key.toString()}
                  align="right">
                  {String(formatters[key] ? formatters[key](item[key]) : item[key])}
                </TableCell>
              ))}
              {/* <TableCell>
                <Tooltip title="Удалить">
                  <IconButton onClick={e => (e.stopPropagation, setIsConfirmModal(true), onDelete?.(item.id))}>
                    <UIIcon name="USD" />
                  </IconButton>
                </Tooltip>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        labelRowsPerPage="Показывать по"
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

      <Modal
        open={isConfirmModal}
        onClose={() => setIsConfirmModal(false)}>
        <span>Хотите удалить</span>
      </Modal>
    </>
  );
};

export default TableTemplate;
