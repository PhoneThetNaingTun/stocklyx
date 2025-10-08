import { NewStoreDialog } from "./_components/NewStoreDialog";
import { StoreTable } from "./_components/storeTable";

const Store = () => {
  return (
    <div>
      <div className="flex justify-end">
        <NewStoreDialog />
      </div>
      <StoreTable />
    </div>
  );
};

export default Store;
