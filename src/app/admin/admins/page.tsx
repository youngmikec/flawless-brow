"use client";

import { FC, useEffect, useState, } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppButton from "../../components/app/AppButton";
import ListGridComp from "../../components/app/ListGridComp";
import { User } from "../../../interfaces";
import AdminsListView from "./views/admin-list-view";
import { useAdmin } from "../../hooks/users-hooks";
import AppModalComp from "../components/AppModal";
import { useAppStore } from "../../../store/app-store";
import AddAdmin from "./views/add-admin";
import DeleteComp from "../components/DeleteComp";
import { DeleteUser } from "../../providers";
import IsAuthenticatedPage from "../../components/auth/is-auth";


const AdminsPage: FC = () => {
    const { toggleAppModal } = useAppStore();
    const [formMode, setFormMode] = useState<"create" | 'update'>('create');
    const [selectedRecord, setSelectedRecord] = useState<User | null>(null);
    const [pageView, setPageView] = useState<'list' | 'grid'>('list');

    const goToAddPage = () => {
        setFormMode('create');
        toggleAppModal(true);
    }

    const setView = (view: 'list' | 'grid' ) => {
        setPageView(view);
    }

    const { isLoading, data: clients, refetch } = useAdmin("");

    const notify = (type: string, msg: string) => {
        if (type === "success") {
            toast.success(msg, {
            // position: toast.POSITION.TOP_RIGHT
            });
        }

        if (type === "error") {
            toast.error(msg, {
            // position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const onViewEditRecord = (record: User) => {
        toggleAppModal(true);
        setFormMode('update');
        setSelectedRecord(record);
    }

    const onDeleteSuccess = (msg: string, data: any) => {
        setSelectedRecord(null);
        notify('info', msg);
        refetch && refetch("");
    }


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
                            <AdminsListView 
                                admins={clients || []} 
                                onViewEditRecord={onViewEditRecord}
                            />
                        )
                    }
                </div>
                
            </div>

            <AppModalComp 
                title={
                    (formMode === 'update' && selectedRecord) 
                        ? "View Admin" 
                        : 'Create Admin'
                }
            >
                {
                    (formMode === 'create' || formMode === 'update') && (
                        <AddAdmin
                            formMode={formMode}
                            selectedRecord={selectedRecord}
                            onSuccess={() => refetch && refetch('')}
                        />
                    )
                }
            </AppModalComp>
            <DeleteComp 
                id={selectedRecord?._id} 
                action={DeleteUser}
                onDeleteSuccess={onDeleteSuccess}
            />
            <ToastContainer />
        </div>
    )
}

export default IsAuthenticatedPage(AdminsPage);