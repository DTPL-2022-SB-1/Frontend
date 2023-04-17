"use client"

import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import moment from 'moment';
import axios from "../../api/axios";

const ListAppointment = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const [data, setData] = useState({});
    const [selected, setSelected] = useState({});

    const initData = () => {
        const token = authContext.authState.token;

        axios.get('appointment/list', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }).then((response) => {
            setData(response.data);
        });
    }

    useEffect(() => {
        if (!authContext.isUserAuthenticated()) {
            router.push('/signin')
        }
    }, [])

    useEffect(() => {
        initData()
    }, [])

    const handleSelect = (appointment) => {
        if (selected.id == appointment.id) {
            setSelected({});
            return;
        }
        setSelected(appointment);
    }

    const renderItemList = (item) => {
        const startTime = moment(item.schedule.start_time);
        const endTime = moment(item.schedule.end_time);

        let text = '';
        text += item.name;
        text += ' - ';
        text += moment(startTime).format('dddd, D MMMM');
        text += ' - ';
        text += moment(startTime).format('HH:mm');
        text += '-';
        text += moment(endTime).format('HH:mm');
        return (
            <div class="w-96">
                <button
                    onClick={() => handleSelect(item)}
                    aria-current="true"
                    type="button"
                    class={`${item.id == selected.id ? 'block w-full cursor-pointer rounded-lg bg-blue-100 p-4 text-left text-blue-600'
                        : 'block w-full cursor-pointer rounded-lg p-4 text-left transition duration-500 hover:bg-neutral-100 hover:text-neutral-500 focus:bg-neutral-100 focus:text-neutral-500 focus:ring-0 dark:hover:bg-neutral-600 dark:hover:text-neutral-200 dark:focus:bg-neutral-600 dark:focus:text-neutral-200'}`}>
                    {text}
                </button>
            </div>
        )
    }

    const renderList = () => {
        if (data.appointments) {
            return (
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Daftar Janji</h3>
                        {data.appointments.map((item) => {
                            return renderItemList(item)
                        })}
                    </div>
                </div>
            )
        }
    }

    const renderSelected = () => {
        if (selected.id) {
            const startDate = moment(selected.schedule.start_time);
            const endtDate = moment(selected.schedule.end_time);

            return (
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Detail Janji</h3>
                    </div>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Nama</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selected.name}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Kategori</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selected.category}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Deskripsi</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selected.description}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Hari</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{startDate.format('dddd, D MMMM')}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Jam</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${moment(startDate).format('HH:mm')}-${moment(endtDate).format('HH:mm')}`}</dd>
                        </div>
                    </dl>
                </div>
            )
        }
    }

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container rounded-md bg-primary bg-opacity-5 dark:bg-dark py-10 px-6 ">
                <div className="-mx-4 flex flex-wrap">
                    <div className="container flex flex-row space-x-4 divide-x-2">
                        <div className="basis-1/3 mr-8">
                            {renderList()}
                        </div>
                        <div className="basis-2/3 ml-8">
                            {selected.id && (
                                <>
                                    <div className="ml-8">
                                        {renderSelected()}
                                    </div>
                                </>)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListAppointment;