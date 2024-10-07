import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"; // Import the Badge component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ListViewProps<T> {
  doctype: string;
  columns: ColumnDef<T>[];
  onRowClick: (docname: string) => void;
  filters?: any[];
}

export const ListView = <T,>({
  doctype,
  columns,
  onRowClick,
  filters = [],
}: ListViewProps<T>) => {
  const combinedFilters = [
    ...filters,
    ["published", "=", 1], // Fetch only published records
  ];

  const { data, isValidating, error } = useFrappeGetDocList(doctype, {
    fields: ["name", ...columns.map((col) => col.accessorKey as string)],
    filters: combinedFilters,
  });

  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const enhancedColumns = columns.map((column) => {
    if (column.accessorKey === "status") {
      return {
        ...column,
        cell: ({ row }: { row: any }) => (
          <Badge
            variant={row.original.status === "Active" ? "secondary" : "destructive"}
          >
            {row.original.status}
          </Badge>
        ),
      };
    }
    return column;
  });

  const table = useReactTable({
    data: data || [],
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(e) => e.stopPropagation()} // Prevent row click when clicking checkbox
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      ...enhancedColumns,
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open actions menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate(`/doctype/${doctype}/${row.original.name}`)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Edit:", row.original.name)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Delete:", row.original.name)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
        enableHiding: false,
      },
    ],
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isValidating) return <Skeleton className="w-full h-full" />;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-end gap-4">
        
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          onChange={(e) => table.setGlobalFilter(e.target.value)}
          className="w-[200px] pl-8"
        />
      </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={() => col.toggleVisibility(!col.getIsVisible())}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-muted/100 text-gray-700 font-semibold text-sm"
            >
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="py-4 px-6">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => onRowClick(row.original.name)} // Correct navigation
                className="cursor-pointer "
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 2}>No results found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-4">
        <div>Showing 1 of 10 rows</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListView;
