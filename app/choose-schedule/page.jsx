"use client"

import ScheduleAppointment from "@/components/ScheduleAppointment"
import { AuthContext } from "@/context/AuthContext";
import { useEffect, useState, useContext } from "react";
import axios from "../../api/axios";
import moment from 'moment';
import { useRouter } from "next/navigation";

const ChooseSchedule = () => {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const [schedule, setSchedule] = useState({})
    const [selected, setSelected] = useState({});

    const parseResponse = (resp, daysInput) => {
        let days = daysInput.map((item) => {

            const day = new Date(item.date);
            const matchingSchedules = resp.schedules.filter((sch) => {
                const schStartDate = new Date(sch.start_time);
                return day.getDate() == schStartDate.getDate();
            })

            const items = matchingSchedules.map((sch) => {
                let text = '';
                const startTime = new Date(sch.start_time);
                const endTime = new Date(sch.end_time);

                text += moment(startTime).format('HH:mm')
                text += '-';
                text += moment(endTime).format('HH:mm')

                return {
                    id: sch.id,
                    text: text,
                    quota: sch.remaining_quota,
                    startTime: sch.start_time,
                    endTime: sch.end_time
                }
            })

            return {
                items: items,
                day: {
                    date: day,
                    text: moment(day).format('dddd, D MMMM')
                },
            }
        })

        return {
            days: days
        }
    }

    const fetchSchedule = (days) => {
        const startDate = moment(new Date()).format('YYYY-MM-DD HH:mm');
        const endDate = moment(new Date(days[days.length - 1].date)).format('YYYY-MM-DD HH:mm');

        axios.get(`appointment/schedules?start_time=${startDate}&end_time=${endDate}`).then((response) => {
            setSchedule(parseResponse(response.data, days))
        })
    }

    const initData = () => {
        let days = [];
        for (let i = 0; i < 6; i++) {
            let curDate = new Date();
            const targetDate = curDate.setDate(curDate.getDate() + i);
            days.push({
                date: targetDate
            })
        }

        fetchSchedule(days);
    }

    const handleSelect = (schedule) => {
        if (selected.id == schedule.id) {
            setSelected({});
            return;
        }
        setSelected(schedule)
    }

    const handleSubmit = () => {
        router.push(`/create-appointment/${selected.id}`)
    }

    useEffect(() => {
        if (!authContext.isUserAuthenticated()) {
            router.push('/signin')
        }
    }, [])

    useEffect(() => {
        initData()
    }, [])

    return (
        <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
            <div className="container rounded-md bg-primary bg-opacity-5 dark:bg-dark py-10 px-6 ">
                <div className="-mx-4 flex flex-wrap">
                    <ScheduleAppointment data={schedule} onClick={handleSelect} selected={selected} onSubmit={handleSubmit} />
                </div>
            </div>
        </section>
    )
}

export default ChooseSchedule;