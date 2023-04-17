"use client"

import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState, useContext } from "react";
import axios from "../../../api/axios";
import moment from 'moment';
import { useRouter } from "next/navigation";


const CreateAppointment = ({ params }) => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const { pid } = params
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState({});

    const handleSubmit = () => {
        const payload = {
            name: name,
            description: description,
            category: category,
            schedule_id: pid
        }
        const token = authContext.authState.token;
        axios.post('appointment/create/', payload, {
            headers: {
                'Authorization': `Token ${token}`,
            }
        }).then((response) => {
            router.push('/')
        }).catch((error) => {
            setError(JSON.stringify(error));
        });
    }


    const renderPreview = () => {
        if (selectedSchedule.id) {
            const startDate = moment(selectedSchedule.startTime)
            const endtDate = moment(selectedSchedule.endTime)

            return (
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Informasi Jadwal</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Pastikan jadwal sudah sesuai.</p>
                    </div>
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Hari</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{startDate.format('dddd, D MMMM')}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Jam</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{`${moment(startDate).format('HH:mm')}-${moment(endtDate).format('HH:mm')}`}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Sisa Kuota</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selectedSchedule.quota}</dd>
                        </div>
                    </dl>
                </div>
            )
        }
    }

    const parseData = (data) => {
        return {
            id: data.id,
            startTime: data.start_time,
            endTime: data.end_time,
            quota: data.remaining_quota
        }
    }

    const initData = () => {
        axios.get(`appointment/schedule/${pid}`).then((response) => {
            setSelectedSchedule(parseData(response.data.schedule));
        }).catch((error) => {
            setError(JSON.stringify(error.response.data));
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

    const renderForm = () => {
        return (
            <div>
                <div className="mb-8">
                    <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        Nama
                    </label>
                    <input
                        type="name"
                        name="name"
                        placeholder="Masukkan Nama Janji yang Anda ingin ajukan"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="category"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        Kategori
                    </label>
                    <select
                        name="category"
                        placeholder="Pilih Kategori"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        <option value="KEPENDUDUKAN">Administrasi Kependudukan</option>
                        <option value="KEUANGAN">Administrasi Keuangan</option>
                        <option value="LINGKUNGAN">Administrasi Lingkungan</option>
                        <option value="NEGARA">Administrasi Negara</option>
                        <option value="NIAGA">Administrasi Niaga</option>
                        <option value="PEMBANGUNAN">Administrasi Pembangunan</option>
                    </select>
                </div>
                <div className="mb-8">
                    <label
                        htmlFor="description"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                    >
                        Deskripsi
                    </label>
                    <textarea
                        name="description"
                        placeholder="Masukkan Deskripsi Janji"
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <h5 className="mb-11 text-base font-medium text-red-400">
                        {error && error}
                    </h5>
                    <button className="flex w-full items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp" onClick={handleSubmit}>
                        Buat
                    </button>
                </div>
            </div>
        )
    }


    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container rounded-md bg-primary bg-opacity-5 dark:bg-dark py-10 px-6 ">
                <div className="-mx-4 flex flex-wrap">
                    <div className="container flex flex-row space-x-4 divide-x-2">
                        <div className="basis-1/3 mr-8">
                            {renderPreview()}
                        </div>
                        <div className="basis-2/3 ml-8">
                            <div className="mb-8 border-b-2 ml-8">
                                <h3 className="text-lg font-bold leading-7 text-gray-900">
                                    Form Pembuatan Janji
                                </h3>
                            </div>
                            <div className="ml-8">
                                {renderForm()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreateAppointment;