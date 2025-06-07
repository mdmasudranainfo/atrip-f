"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaCheck } from "react-icons/fa"; // Correct icon import

const ProfileTabs = () => {
    const tabItems = [
        { value: "overview", label: "Overview" },
        { value: "documents", label: "Documents" },
        { value: "how_to_apply", label: "How to apply" },
        { value: "terms_conditions", label: "Visa Terms & Conditions" },
        { value: "faq", label: "Faq" },
    ];

    // const handleIcons = (tabValue: string) => {
    //     switch (tabValue) {
    //         case "overview":
    //             return <FaCheck className="text-blue-600" />;
    //         case "documents":
    //             return <FaCheck className="text-green-600" />;
    //         case "how_to_apply":
    //             return <FaCheck className="text-orange-600" />;
    //         case "terms_conditions":
    //             return <FaCheck className="text-red-600" />;
    //         case "faq":
    //             return <FaCheck className="text-purple-600" />;
    //         default:
    //             return <FaCheck />;
    //     }
    // };

    return (
        <div>
            <main className="container w-full m-auto">
                {/* Tabs menu */}
                <div className="flex gap-8 my-6 lg:flex-row flex-col">
                    {/* left section start */}
                    <div className="w-full rounded-lg">
                        <div className="w-full">
                            <Tabs defaultValue="documents" className="w-full font-bold bg-[#f6f7fa]">
                                <TabsList className="h-auto py-2  w-full flex-wrap md:justify-between flex gap-0 border-b bg-white">
                                    {tabItems.map((tab) => (
                                        <TabsTrigger
                                            key={tab.value}
                                            value={tab.value}
                                            className="group px-4 py-3 text-base font-bold text-muted-foreground data-[state=active]:text-white data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none flex items-center gap-3 "
                                        >
                                            {/* Icon Wrapper - Gets blue background when active */}

                                            {/* Tab Label */}
                                            <span className="text-dark">{tab.label}</span>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                <div className="mt-5">
                                    <TabsContent value="overview" className="border-none bg-white p-5  rounded-lg">
                                        <h1>hello this is first tab</h1>
                                    </TabsContent>

                                    <TabsContent value="documents" className="border-none bg-white p-5  rounded-lg">
                                        <h1>hello this is 2nd tab</h1>
                                    </TabsContent>

                                    <TabsContent value="how_to_apply" className="border-none bg-white p-5  rounded-lg">
                                        <h1>hello this is 3rd tab</h1>
                                    </TabsContent>

                                    <TabsContent value="terms_conditions" className="border-none bg-white p-5  rounded-lg">
                                        <h1>hello this is 4th tab</h1>
                                    </TabsContent>

                                    <TabsContent value="faq" className="border-none bg-white p-5  rounded-lg">
                                        <h1>hello this is 5th tab</h1>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                    {/* left section ends */}
                </div>
            </main>
        </div>
    );
};

export default ProfileTabs;
