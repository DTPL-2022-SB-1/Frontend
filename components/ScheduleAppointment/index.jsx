import ScheduleCol from './ScheduleCol';
import moment from 'moment';

const ScheduleAppointment = ({ data, onClick, onSubmit, selected }) => {
    const renderPreview = () => {
        if (selected.id) {
            const startDate = moment(selected.startTime)
            const endtDate = moment(selected.endTime)

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
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{selected.quota}</dd>
                        </div>
                    </dl>
                    <div className="px-4 sm:px-0 grid justify-items-center">
                        <button onClick={onSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Buat Janji
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div className="px-4 sm:px-0">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Pilih Jadwal yang Anda inginkan</h3>
            </div>
        )
    }

    const renderDays = () => {
        if (data.days && data.days.length > 0) {
            return data.days.map((day) => <ScheduleCol data={day} onClick={onClick} selected={selected} />)
        }
        return (
            <div>Tidak ada jadwal tersedia</div>
        )
    }

    return (
        <div className="container flex flex-row space-x-4 divide-x-2">
            <div className="basis-1/3 mr-8">
                {renderPreview()}
            </div>
            <div className="basis-2/3 ml-8">
                <div className="mb-8 border-b-2 ml-8">
                    <h3 className="text-lg font-bold leading-7 text-gray-900">
                        Pilihan Jadwal
                    </h3>
                </div>
                <div className="flex flex-row ml-8">
                    {renderDays()}
                </div>
            </div>
        </div>
    )
}

export default ScheduleAppointment;