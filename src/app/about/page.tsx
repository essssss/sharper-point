import SideNav from "../ui/sidenav";

export default function Page() {
    return (
        <>
            <div className="flex h-screen flex-col   md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-48 ">
                    <SideNav />
                </div>
                <div className="rounded-xl p-6 m-4 md:w-4/5 bg-gray-50 md:p-12">
                    <div className="text-4xl font-bold">About me:</div>
                    <div className="p-3">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Voluptatem nulla sed architecto, perferendis,
                            saepe et reprehenderit itaque autem rerum sint
                            dolorem eius quas iusto nihil maxime laboriosam odit
                            quis placeat.
                        </p>
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Aut vero temporibus illum quasi ad, officia
                            excepturi officiis velit quam veniam culpa itaque
                            soluta, enim aliquid vitae sed ipsam perspiciatis
                            error.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
