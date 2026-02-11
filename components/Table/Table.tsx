"use client";

import React from "react";
import SkeletonRow from "../loaders/SkeletonRow";
import SkeletonHeader from "../loaders/SkeletonHeader";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  loadingRows?: number;
  loadingcolumns?: number;
  minWidth?: string;
};

export default function Table<T>({
  columns,
  data,
  isLoading = false,
  loadingRows = 5,
  loadingcolumns = 5,
  minWidth = "1000px",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <div style={{ minWidth }}>
        {isLoading ? (
          <SkeletonHeader columns={loadingcolumns} />
        ) : (
          <div
            className="grid bg-[#EFEEEE] px-6 py-3 text-xs lg:text-sm leading-5 font-semibold text-[#5A5A5A] rounded-t-lg"
            style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
          >
            {columns.map((col, index) => (
              <p key={index}>{col.header}</p>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="divide-y">
          {isLoading
            ? Array.from({ length: loadingRows }).map((_, i) => (
                <SkeletonRow key={i} columns={columns.length} />
              ))
            : data.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="grid items-center px-6 py-5 text-xs lg:text-sm leading-5 text-[#564848]"
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <div key={colIndex}>
                      {col.render
                        ? col.render(row)
                        : (row[col.accessor as keyof T] as React.ReactNode)}
                    </div>
                  ))}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
