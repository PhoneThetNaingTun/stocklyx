import { IconCircleDashedNumber1 } from "@tabler/icons-react";
import { measurementUnitColumns } from "../../measurement-units/_components/column";
import { MeasurementUnitTable } from "../../measurement-units/_components/measurementUnitTable";

const MeasurementUnitArchives = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold flex gap-2 items-center">
        <IconCircleDashedNumber1 />
        <span>Archived Measurement Units</span>
      </h2>

      <MeasurementUnitTable column={measurementUnitColumns} archivePage />
    </div>
  );
};

export default MeasurementUnitArchives;
