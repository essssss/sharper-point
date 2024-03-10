export default function Service({
    title,
    description,
    cost,
}: {
    title: string;
    description: string;
    cost: number;
}) {
    return (
        <div className="rounded-xl content-between bg-gray-200 p-4 m-2 shadow-sm">
            <div className="text-lg font-medium">{title}</div>
            <div className="text-md text-green-800">{description}</div>
            <div className="text-sm text-green-500">${cost}.00</div>
        </div>
    );
}
