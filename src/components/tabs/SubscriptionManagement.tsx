import {Button} from "@/components/ui/button.tsx";
import {Check} from "lucide-react";

export default function SubscriptionManagement() {

    return (
        <div className={"w-full h-full"}>
            <div className={"w-full px-6 h-[100px] flex justify-between items-center"}>
                <h1 className={"text-3xl text-black font-semibold my-5"}>Subscription Plan</h1>
                <Button className={"bg-green-600 text-white"}>Add Plan</Button>
            </div>
            {/* Cards */}
            <div className={"flex flex-wrap justify-between items-center max-w-[900px] min-h-[75vh] mx-auto gap-4"}>
                <div className={"flex flex-col items-center justify-center gap-4"}>
                    <h1 className={"text-xl font-semibold"}>Standard</h1>
                    <div className={"border border-[#125BAC] w-[250px] h-[450px] rounded-xl overflow-hidden relative"}>
                        <div className={"w-full h-[90px] bg-[#125BAC] flex justify-center items-center"}>
                            <h1 className={"text-center text-3xl text-white font-semibold"}>$0/<span className={"text-sm"}>3 month</span></h1>
                        </div>
                        <div className={"w-full h-full pb-[90px] text-black font-light"}>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>

                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>

                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                        </div>
                        <div className={"w-full h-[90px] bg-[#F6F6F6] flex justify-center items-center absolute bottom-0"}>
                            <Button className={"w-[150px] h-[50px] bg-[#125BAC]"}>Edit Plan</Button>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col items-center justify-center gap-4"}>
                    <h1 className={"text-xl font-semibold"}>Premium</h1>
                    <div className={"border border-[#125BAC] w-[250px] h-[450px] rounded-xl overflow-hidden relative"}>
                        <div className={"w-full h-[90px] bg-[#125BAC] flex justify-center items-center"}>
                            <h1 className={"text-center text-3xl text-white font-semibold"}>$19.99/<span className={"text-sm"}>6 month</span></h1>
                        </div>
                        <div className={"w-full h-full pb-[90px] text-black font-light"}>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>

                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>

                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                        </div>
                        <div className={"w-full h-[90px] bg-[#F6F6F6] flex justify-center items-center absolute bottom-0"}>
                            <Button className={"w-[150px] h-[50px] bg-[#125BAC]"}>Edit Plan</Button>
                        </div>
                    </div>
                </div>
                <div className={"flex flex-col items-center justify-center gap-4"}>
                    <h1 className={"text-xl font-semibold"}>Custom</h1>
                    <div className={"border border-[#125BAC] w-[250px] h-[450px] rounded-xl overflow-hidden relative"}>
                        <div className={"w-full h-[90px] bg-[#125BAC] flex justify-center items-center"}>
                            <h1 className={"text-center text-3xl text-white font-semibold"}>$49.99/<span className={"text-sm"}>Year</span></h1>
                        </div>
                        <div className={"w-full h-full pb-[90px] text-black font-light"}>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>

                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>

                            <div className={"flex justify-start gap-4 mt-3 items-center px-4"}>
                                <Check size={"20"} color={"#125BAC"}/>
                                <h6>Info of the package</h6>
                            </div>
                        </div>
                        <div className={"w-full h-[90px] bg-[#F6F6F6] flex justify-center items-center absolute bottom-0"}>
                            <Button className={"w-[150px] h-[50px] bg-[#125BAC]"}>Edit Plan</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}