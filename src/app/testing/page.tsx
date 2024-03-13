import Search from "../search";
import SideNav from "../ui/sidenav";
import { fetchCustomers } from "../fetchFunctions";

export default async function Page() {
    const customersList = await fetchCustomers();
    return (
        <>
            <div className="flex h-screen flex-col   md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-48 ">
                    <SideNav />
                </div>
                <div className="rounded-xl p-6 m-4 md:w-4/5 bg-gray-50 md:p-12">
                    <div className="text-4xl font-bold">Testing stuff out</div>
                    <div className="p-3">
                        <div>Can we find a user via email?</div>
                        <Search placeholder="search" />
                        <ul>
                            {customersList.map((customer) => (
                                <li>{customer.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
