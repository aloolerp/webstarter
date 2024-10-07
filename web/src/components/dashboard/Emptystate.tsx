

import { Button } from "@/components/ui/button";

// EmptyState component to display when no items are present in a dashboard page.

export const Emptystate = () => {
  return (
   
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Route Label Here
          </h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm min-h-[600px]"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              This is Empty
            </h3>
            <p className="text-sm text-muted-foreground">
              You can add items by clicking
            </p>
            <Button className="mt-4">Add</Button>
          </div>
        </div>
      </main>
   
  );
};

export default Emptystate;
