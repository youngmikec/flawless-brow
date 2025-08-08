"use client";
import { FC, useState, useEffect } from "react";
import Image from "next/image";

type Props = {
    view?: "list" | "grid";
    onViewChange?: (view: "list" | "grid") => void;
}

const ListGridComp: FC<Props> = ({ view = 'list', onViewChange }) => {
    const [isList, setIsList] = useState<boolean>(true);

    const toggleView = (view: "list" | "grid" = 'list') => {
        view === 'list' ? setIsList(true) : setIsList(false);

        if(onViewChange) {
            onViewChange(view);
        }
    }

    useEffect(() => {
        if (view) {
            setIsList(view === 'list');
        }
    }, [view]);

    return (
        <div className="flex gap-2 border-[1px] border-[#0000001F] rounded-md p-1">
            <div 
                className={`${isList && 'bg-[#0000001F]'} cursor-pointer rounded-md p-1 flex justify-center items-center`}
                onClick={() => toggleView('list')}
            >
                <Image
                    src="/svgs/list-icon.svg"
                    alt="filter"
                    width={18}
                    height={18}
                />
            </div>
            <div 
                className={`${!isList && 'bg-[#0000001F]'} cursor-pointer rounded-md p-1 flex justify-center items-center`}
                onClick={() => toggleView('grid')}
            >
                <Image
                    src="/svgs/grid-icon.svg"
                    alt="filter"
                    width={18}
                    height={18}
                />
            </div>
        </div>
    )
}

export default ListGridComp;