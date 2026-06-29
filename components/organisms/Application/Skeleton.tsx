import { Skeleton } from "../../ui/skeleton";

interface SkeletonTableProps {
  columnCount?: number;
  rowCount?: number;
}

export function SkeletonTable({ columnCount = 3, rowCount = 5 }: SkeletonTableProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      {Array.from({ length: rowCount }).map((_, rowIndex) => (
        <div className="flex w-full items-center gap-4" key={rowIndex}>
          {Array.from({ length: columnCount }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-8 w-full rounded-md" />
          ))}
        </div>
      ))}
    </div>
  );
}