import AuthLayout from "../../layout/AuthLayout.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import forgotPassword from "/auth/forgotpassword.svg";
import {
    Card,
    CardContent, CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import { useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ArrowLeft, Key} from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async () => navigate("/verify-email");

    return (
        <AuthLayout>
            <AuthLayout.Left className={"w-full h-full flex items-center"} >
                <div className={"w-[350px] h-[400px] md:w-[450px] md:h-[550px] mx-auto text-white text-center mt-4 md:mt-8"}>
                    <div className={"w-[80%] flex justify-center mx-auto"}>
                        <ImageWithSkeleton src={forgotPassword}/>
                    </div>
                    <h1 className={"text-4xl md:text-6xl font-bold my-3"}>Forgot Password</h1>
                    <p className={"text-sm tracking-tight space-y-2"}>Enter your registered email address, and we’ll send you a secure link to reset your password and regain access to your Lunq account.</p>
                </div>
            </AuthLayout.Left>
            <AuthLayout.Right className={"w-full items-center flex h-full"} >
                <div className={"w-[300px] h-[200px] md:w-[450px] md:h-[550px] mx-auto"}>
                    <Card className="w-full max-w-sm shadow-md">
                        <CardHeader>
                            <CardTitle className={"text-center"}>
                                <div className={"rounded-full mx-auto w-[35px] h-[35px] p-1 flex justify-center items-center shadow-md bg-card"}>
                                    <Key className="text-primary" />
                                </div>
                            </CardTitle>
                            <CardDescription>
                                <div className={"w-full h-full text-center"}>
                                    <h1 className={"text-xl font-semibold text-foreground"}>Forgot password?</h1>
                                    <p className={"text-sm mt-2 text-muted-foreground"}>No worries, we'll send reset instructions.</p>
                                </div>
                            </CardDescription>
                            {/*<CardAction>*/}
                            {/*    <Button variant="link">Sign Up</Button>*/}
                            {/*</CardAction>*/}
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email" className={"font-normal"}>Email</Label>
                                        <div className="p-[1px] rounded-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE]">
                                            <Input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                id="email"
                                                type="email"
                                                placeholder="m@example.com"
                                                required
                                                className="py-5 rounded-full w-full bg-card text-foreground "
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button onClick={() => handleSubmit()} type="submit" className="w-full rounded-full py-5 bg-linear-to-l from-[#0170DA] to-[#002282] cursor-pointer">
                                Submit
                            </Button>
                            <CardTitle className="text-center text-sm mt-2 font-normal">
                                <span className="font-semibold bg-gradient-to-r from-[#002282] to-[#0170DA] bg-clip-text text-transparent hover:opacity-80 transition-all duration-300">
                                    <Link to="/sign-in" className={"flex justify-center items-center text-muted-foreground hover:text-foreground transition-colors"}>
                                        <ArrowLeft className="mr-2" size={18} />
                                        Back to log in
                                    </Link>
                                </span>
                            </CardTitle>
                        </CardFooter>
                    </Card>
                </div>
            </AuthLayout.Right>
        </AuthLayout>
    )
}