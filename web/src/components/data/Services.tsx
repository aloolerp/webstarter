
import ListView from '@/components/dashboard/ListView';
import { ColumnDef } from '@tanstack/react-table';
import { FrontService } from '@/types/Aloolpages/FrontService';


const columns: ColumnDef<FrontService>[] = [
  { accessorKey: 'header', header: 'Header' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'status', header: 'Status' },
//   { accessorKey: 'title', header: 'Title' },
];

const Services = () => {
  return (
    <>
    
    <ListView
      doctype="Front Service"
      columns={columns}
      onRowClick={(docname) => console.log('Navigating to:', docname)}
    />
    </>
  );
};

export default Services;