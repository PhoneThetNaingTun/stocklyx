import { Button } from "@/components/ui/button";
import { IconArchive, IconCircleDashedNumber1 } from "@tabler/icons-react";
import Link from "next/link";

import { measurementUnitColumns } from "./_components/column";
import { MeasurementUnitTable } from "./_components/measurementUnitTable";
import { NewMeasurementUnitDialog } from "./_components/NewMeasurementUnitDialog";

const MeasurementUnits = () => {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <IconCircleDashedNumber1 />
          Measurement Units
        </h2>
      </div>
      <div className="flex justify-end gap-3">
        <NewMeasurementUnitDialog />
        <Button variant={"outline"}>
          <Link
            href={"/dashboard/archive/measurement-units"}
            className="flex items-center gap-2"
          >
            <IconArchive />
            <span>Archives</span>
          </Link>
        </Button>
      </div>
      <MeasurementUnitTable
        column={measurementUnitColumns}
        archivePage={false}
      />
    </div>
  );
};

export default MeasurementUnits;
