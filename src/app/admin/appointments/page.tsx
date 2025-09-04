"use client";

import { FC, useEffect, useState, } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import AppButton from "../../components/app/AppButton";
import ListGridComp from "../../components/app/ListGridComp";
import { Appointment } from "../../../interfaces";
import AppointmentListView from "./views/appointment-list-view";
import { useAppointment } from "../../hooks/appointment-hooks";
import { useAppStore } from "../../../store/app-store";
import AppModalComp from "../components/AppModal";
import DeleteComp from "../components/DeleteComp";
import { DeleteAppointment } from "@/app/providers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAppointment from "./views/add-appointment";
import IsAuthenticatedPage from "../../components/auth/is-auth";


const notify = (type: string, msg: string) => {
    if (type === "success") {
        toast.success(msg, {
        // position: toast.POSITION.TOP_RIGHT
        });
    }else if (type === "error") {
        toast.error(msg, {
            // position: toast.POSITION.TOP_RIGHT,
        });
    } else {
        toast.info(msg);
    }
}

const AppointmentsPage: FC = () => {
    const router = useRouter();
    const { toggleAppModal } = useAppStore();
    const queryParams: string = `?filter=&populate=productService,customer&sort=-1&limit=10`;
    const [pageView, setPageView] = useState<'list' | 'grid'>('list');
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [selectedRecord, setSelectedRecord] = useState<Appointment | null>(null);
    const [formMode, setFormMode] = useState<'create' | 'update'>('create');

    // const goToAddPage = () => {
    //     router.push('/admin/appointment/add');
    // }

    const onViewEditRecord = (record: Appointment) => {
        toggleAppModal(true);
        setFormMode('update');
        setSelectedRecord(record);
    }

    const { data, refetch } = useAppointment(queryParams);

    const onDeleteSuccess = (msg: string) => {
        setSelectedRecord(null);
        notify('info', msg);
        refetch && refetch(queryParams);
    }

    useEffect(() => {
        setAppointments(data || []);
    }, [data]);


    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold font-inter text-primary">Appointments</h1>
                {/* <AppButton
                    btnText="Add"
                    bgColor="blue"
                    fill="fill"
                    btnSize="sm"
                    width={'max'}
                    type="button"
                    onClick={goToAddPage}
                /> */}
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
                            onViewChange={setPageView}
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
                            <AppointmentListView 
                                appointments={appointments} 
                                onViewEditRecord={onViewEditRecord}
                            />
                        )
                    }
                </div>
                
            </div>

            <AppModalComp
                title={
                    (formMode === 'update' && selectedRecord) 
                        ? `${selectedRecord?.productService?.title} Appointment` 
                        : 'Add Appointment'
                }
            >
                {
                    (formMode === 'create' || formMode === 'update') && (
                        <AddAppointment
                            formMode={formMode}
                            selectedRecord={selectedRecord}
                            onSuccess={() => refetch && refetch(queryParams)}
                        />
                    )
                }
            </AppModalComp>
            <DeleteComp 
                id={selectedRecord?._id} 
                action={DeleteAppointment}
                onDeleteSuccess={onDeleteSuccess}
            />
            <ToastContainer />
        </div>
    )
}

export default IsAuthenticatedPage(AppointmentsPage);
