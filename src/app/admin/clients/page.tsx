"use client";

import { FC, useEffect, useState, } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppButton from "../../components/app/AppButton";
import ListGridComp from "../../components/app/ListGridComp";
import { User } from "../../../interfaces";
import ClientsListView from "./views/client-list-view";
import { useUser } from "../../hooks/users-hooks";


const ClientPage: FC = () => {
    const router = useRouter();
    const [pageView, setPageView] = useState<'list' | 'grid'>('list');
    const [clients, setClients] = useState<User[]>([]);

    const goToAddPage = () => {
        router.push('/admin/clients/add');
    }

    const setView = (view: 'list' | 'grid' ) => {
        setPageView(view);
    }

    const { isLoading, data, refetch } = useUser("?role=user");

    useEffect(() => {
        setClients(data || []);
    }, [data]);


    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold font-inter text-primary">Clients</h1>
                <AppButton
                    btnText="Add"
                    bgColor="blue"
                    fill="fill"
                    btnSize="sm"
                    width={'max'}
                    type="button"
                    onClick={goToAddPage}
                />
            </div>
            <div 
                className="mt-12 bg-white rounded-lg w-full border-[1px] border-[#0000001F]"
            >
                <div className="flex justify-end items-center gap-4 p-4 border-b-[1px] border-[#0000001F]">
                    <div className="flex-grow">
                        <input 
                            type="text"
                            placeholder="Search"
                            className="w-full px-2 py-2 text-xs border-[1px] border-[#0000001F] rounded-md"
                        />
                    </div>


                    <div>
                        <ListGridComp 
                            onViewChange={setView}
                        />
                    </div>
                    <div>
                        <p className="flex gap-2 justify-center items-center text-[#003ECB] text-xs font-medium font-inter">
                            Filter
                            <Image
                                src="/svgs/filter-icon.svg"
                                alt="filter"
                                width={18}
                                height={18}
                            />
                        </p>
                    </div>
                </div>

                <div className="my-4">
                    {
                        pageView === 'list' && (
                            <ClientsListView clients={clients} />
                        )
                    }
                </div>
                
            </div>
        </div>
    )
}

export default ClientPage;