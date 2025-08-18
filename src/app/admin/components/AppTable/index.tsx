"use client";
import { FC, ReactNode } from "react";

type TableProps = {
  children: ReactNode,
  tableHeaders: string[];
}

const AppTable: FC<TableProps> = ({ children, tableHeaders}) => {
  return (
    <>
        <div className="w-full overflow-x-scroll">
            <table className="w-full border-none border-collapse">
                <thead>
                    <tr className="border-b-[1px] border-[#0000001F]">
                      {
                        tableHeaders.map((header: string, idx: number) => (
                          <th 
                            key={idx}
                            className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap"
                          >
                            { header }
                          </th>
                        ))
                      }
                    </tr>
                </thead>
                <tbody>
                  { children }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default AppTable;