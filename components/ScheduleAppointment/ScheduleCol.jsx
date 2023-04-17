import Badge from "./Badge"

const ScheduleCol = ({ data, onClick, selected }) => {
    return (
        <div className="flex-col">
            <div className="grid justify-items-center">
                <div className="">{data.day.text}</div>
                <ul className="w-36">
                    {data.items && data.items.map((item) => (
                        <li
                            class="py-4 dark:border-opacity-50 grid justify-items-center">
                            <Badge item={item} onClick={onClick} selected={selected} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ScheduleCol;