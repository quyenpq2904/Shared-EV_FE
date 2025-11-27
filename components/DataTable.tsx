"use client";

import React, { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Selection,
  SortDescriptor,
  Spinner,
} from "@heroui/react";

export type Column = {
  name: string;
  uid: string;
  sortable?: boolean;
  align?: "start" | "center" | "end";
};

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  renderCell: (item: T, columnKey: React.Key) => React.ReactNode;
  page?: number;
  totalPages?: number;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  showPagination?: boolean;
  rowsPerPage?: number;
  onSelectionChange?: (keys: Selection) => void;
  initialSelectedKeys?: Selection;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  renderCell,
  page = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  isLoading = false,
  showPagination = true,
  rowsPerPage = 10,
  onSelectionChange,
  initialSelectedKeys = new Set([]),
}: DataTableProps<T>) {
  const [selectedKeys, setSelectedKeys] =
    React.useState<Selection>(initialSelectedKeys);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "id",
    direction: "ascending",
  });
  const bottomContent = useMemo(() => {
    if (!showPagination) return null;
    const startItem = (page - 1) * rowsPerPage + 1;
    const endItem = Math.min(page * rowsPerPage, totalItems);

    return (
      <div className="py-2 px-2 flex justify-between items-center border-t border-default-100 mt-2">
        <span className="w-[30%] text-small text-default-400">
          Showing {data.length > 0 ? startItem : 0} to {endItem} of {totalItems}{" "}
          results
        </span>

        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={totalPages}
          onChange={(newPage) => {
            if (onPageChange) onPageChange(newPage);
          }}
          // classNames={{ cursor: "bg-primary text-white font-bold" }}
          isDisabled={isLoading}
        />
      </div>
    );
  }, [
    page,
    totalPages,
    showPagination,
    totalItems,
    rowsPerPage,
    onPageChange,
    isLoading,
    data.length,
  ]);

  const handleSelectionChange = (keys: Selection) => {
    setSelectedKeys(keys);
    if (onSelectionChange) {
      onSelectionChange(keys);
    }
  };

  return (
    <div className="bg-content1 border border-default-200 rounded-xl p-4 shadow-sm relative">
      <Table
        aria-label="Table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[600px] shadow-none bg-transparent p-0 min-h-[300px]",
          th: "bg-transparent text-default-900 border-b border-default-200 font-semibold h-10",
          td: "py-4 border-b border-default-100 group-last:border-none",
          thead: "[&>tr]:first:shadow-none",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        onSelectionChange={handleSelectionChange}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.align || "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No results found"}
          items={data}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
