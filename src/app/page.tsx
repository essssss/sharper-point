import Link from "next/link";
import SideNav from "./ui/sidenav";

export default function Page() {
    return (
        <>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-48 ">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    Acupunture
                </div>
            </div>
        </>
    );
}
