import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import SignUpImage from "/auth/signup.svg";
import GoogleImage from "/auth/google.png";
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
import {useState} from "react";
import {Link} from "react-router-dom";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import AuthLayout from "@/layout/AuthLayout.tsx";
import {toast} from "sonner";

export default function SignUpPage() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [isPasswordOn, setIsPasswordOn] = useState<boolean>(false);
    const [isConfirmPasswordOn, setIsConfirmPasswordOn] = useState<boolean>(false);

    const signUp = () => {
        toast.success("Sign Up successfully!");
    }
    const googleAuth = () => {}

    return (
        <AuthLayout>
            <AuthLayout.Left className={"w-full h-full flex items-center justify-between"} >
                <div className={"w-[350px] h-[400px] md:w-[650px] md:h-[550px] mx-auto text-white text-center mt-4 md:mt-8"}>
                    <div className={"w-[80%] flex justify-center mx-auto"}>
                        <ImageWithSkeleton src={SignUpImage}/>
                    </div>
                    <h1 className={"text-4xl md:text-6xl font-bold my-3"}>Create Your Account</h1>
                    <p className={"text-sm tracking-tight space-y-2"}>Join Lunq to connect with verified professionals, collaborate easily, and manage projects seamlessly. Enjoy direct contracts, secure payments, and zero commissions—keeping full control of your work and earnings.</p>
                </div>
            </AuthLayout.Left>
            <AuthLayout.Right className={"w-full items-center flex h-full"} >
                <div className={"w-[300px] h-[200px] md:w-[450px] md:h-[550px] mx-auto"}>
                    <Card className="w-full max-w-sm shadow-md">
                        <CardHeader>
                            <CardTitle className={"text-center font-semibold md:text-xl"}>Create an account</CardTitle>
                            <CardDescription className={"text-center"}>
                                Your information is safe. We use encrypted connections to protect your data.
                            </CardDescription>
                            {/*<CardAction>*/}
                            {/*    <Button variant="link">Sign Up</Button>*/}
                            {/*</CardAction>*/}
                        </CardHeader>
                        <CardContent>
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name" className={"font-normal"}>Name</Label>
                                        <div className="p-[1px] rounded-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE]">
                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                id="name"
                                                type="name"
                                                placeholder="name"
                                                required
                                                className="py-5 rounded-full w-full bg-card text-foreground "
                                            />
                                        </div>
                                    </div>
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
                                    <div className="grid gap-2">
                                        <div className="flex items-center relative">
                                            <Label htmlFor="password">Password</Label>
                                            {
                                                isPasswordOn? (
                                                    <div
                                                        className={"cursor-pointer absolute right-4 top-9 text-muted-foreground"}
                                                        onClick={() => setIsPasswordOn(!isPasswordOn)}
                                                    >
                                                        <EyeIcon size={19} />
                                                    </div>
                                                ):(
                                                    <div
                                                        className={"cursor-pointer absolute right-4 top-9 text-muted-foreground"}
                                                        onClick={() => setIsPasswordOn(!isPasswordOn)}
                                                    >
                                                        <EyeOffIcon size={19} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="p-[1px] rounded-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE]">
                                            <Input
                                                id="password"
                                                type={!isPasswordOn ? "password" : "text"}
                                                required
                                                value={password}
                                                placeholder="password"
                                                className={"py-5 rounded-full w-full bg-card text-foreground"}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center relative">
                                            <Label htmlFor="confirm-password">Confirm Password</Label>
                                            {
                                                isConfirmPasswordOn? (
                                                    <div
                                                        className={"cursor-pointer absolute right-4 top-9 text-muted-foreground"}
                                                        onClick={() => setIsConfirmPasswordOn(!isConfirmPasswordOn)}
                                                    >
                                                        <EyeIcon size={19} />
                                                    </div>
                                                ):(
                                                    <div
                                                        className={"cursor-pointer absolute right-4 top-9 text-muted-foreground"}
                                                        onClick={() => setIsConfirmPasswordOn(!isConfirmPasswordOn)}
                                                    >
                                                        <EyeOffIcon size={19} />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="p-[1px] rounded-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE]">
                                            <Input
                                                id="confirm-password"
                                                type={!isConfirmPasswordOn ? "password" : "text"}
                                                required
                                                value={confirmPassword}
                                                placeholder="confirm password"
                                                className={"py-5 rounded-full w-full bg-card text-foreground"}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                        {/*<Link*/}
                                        {/*    to={"/forgot-password"}*/}
                                        {/*    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"*/}
                                        {/*>*/}
                                        {/*    Forgot your password?*/}
                                        {/*</Link>*/}
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button onClick={()=> signUp()} type="submit" className="w-full rounded-full py-5 bg-linear-to-l from-[#0170DA] to-[#002282] cursor-pointer">
                                Sign Up
                            </Button>
                            <div className="p-[1px] rounded-full w-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE]">
                                <Button onClick={()=> googleAuth()} variant="outline" className="w-full rounded-full py-5 bg-card hover:bg-accent transition-colors cursor-pointer">
                                    <div className={"w-[20px] h-[20px]"}>
                                        <ImageWithSkeleton
                                            src={GoogleImage}
                                        />
                                    </div>
                                    Sign up with Google
                                </Button>
                            </div>
                            <CardTitle className="text-center text-sm mt-2 font-normal text-muted-foreground">
                                Already have an account?{" "}
                                <span className="font-semibold bg-gradient-to-r from-[#002282] to-[#0170DA] bg-clip-text text-transparent hover:opacity-80 transition-all duration-300">
                                    <Link to="/sign-in">Log in</Link>
                                </span>
                            </CardTitle>
                        </CardFooter>
                    </Card>
                </div>
            </AuthLayout.Right>
        </AuthLayout>
    )
}