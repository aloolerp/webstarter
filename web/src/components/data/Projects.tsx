
import ListView from '@/components/dashboard/ListView';
import { ColumnDef } from '@tanstack/react-table';
import { FrontProject } from '@/types/Aloolpages/FrontProject';


const columns: ColumnDef<FrontProject>[] = [
  { accessorKey: 'header', header: 'Header' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'status', header: 'Status' },
//   { accessorKey: 'title', header: 'Title' },
];

const Projects = () => {
  return (
    <>
    
    <ListView
      doctype="Front Project"
      columns={columns}
      onRowClick={(docname) => console.log('Navigating to:', docname)}
    />
    </>
  );
};

export default Projects;