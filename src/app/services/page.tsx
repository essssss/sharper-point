import SideNav from "../ui/sidenav";
import Service from "./ui/Service";

export default function Page() {
    const serviceItems = [
        {
            name: "acupuncture",
            description:
                "An acupunture session with one of our top practitioners",
            cost: 35,
        },
        {
            name: "Massage",
            description:
                "A massage session with one of our experienced practitioners",
            cost: 85,
        },
        {
            name: "Hot Stone",
            description:
                "A hot stone session with one of our experienced practitioners",
            cost: 105,
        },
    ];

    return (
        <>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-48 ">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    <p>Services:</p>
                    {serviceItems.map((item) => {
                        console.log("hi hello");
                        return (
                            <Service
                                key={item.name}
                                title={item.name}
                                description={item.description}
                                cost={item.cost}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
