const Badge = ({ item, onClick, selected }) => {
    return (
        <span
            className={`whitespace-nowrap rounded-full ${selected.id == item.id ? 'bg-green-600' : 'bg-gray-100'} px-2.5 py-0.5 text-sm ${selected.id == item.id ? 'text-black-900' : 'text-gray-400'}`}
            onClick={() => onClick(item)}>
            {item.text}
        </span>
    )
}

export default Badge;