import AuthLayout from "../../layout/AuthLayout.tsx";
import ImageWithSkeleton from "@/components/ui/ImageWIthSkeleton.tsx";
import SignInImage from "/auth/signin.svg";
import GoogleImage from "/auth/google.png";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {EyeIcon, EyeOffIcon} from "lucide-react";
import Cookies from "js-cookie";
import {TOKEN_NAME} from "@/enum/token.enum.ts";
import {toast} from "sonner";
import {authService} from "@/services/auth.service.ts";
import {useDispatch} from "react-redux";
import {login} from "@/redux/reducers/authSlice.ts";

import {USER_ROLE_ENUM} from "@/enum/role.enum.ts";

export default function SignInPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isPasswordOn, setIsPasswordOn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Sign in function updated with real API integration
    const signIn = async () => {
        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }

        setIsLoading(true);
        try {
            const result = await authService.login({ email, password });
            
            const { accessToken, refreshToken, user } = result;

            // RBAC Check: Only allow Admin and Sub Admin to this dashboard
            if (user.role !== USER_ROLE_ENUM.SUPER_ADMIN && user.role !== USER_ROLE_ENUM.SUB_ADMIN) {
                toast.error("Access Denied: Only administrators can access this dashboard.");
                setIsLoading(false);
                return;
            }

            // Map backend user to frontend IUser if needed
            const frontendUser = {
                id: user.id,
                name: user.email.split('@')[0], // Fallback if name not in backend user
                email: user.email,
                role: user.role,
                image: user.profileImage || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
            };

            // Dispatch to Redux
            dispatch(login({
                user: frontendUser,
                token: accessToken
            }));

            // Cookies added for persistence
            Cookies.set(TOKEN_NAME.HRM_FIRM, accessToken);
            Cookies.set(TOKEN_NAME.USER_INFO, JSON.stringify(frontendUser));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Toast added
            toast.success(`Welcome back, ${frontendUser.name}!`);

            // Navigate to home
            navigate("/");
        } catch (error: any) {
            toast.error(error.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    }
    const googleAuth = async () => {}

    return (
        <AuthLayout>
            <AuthLayout.Left className={"w-full h-full flex items-center"} >
                <div className={"w-[350px] h-[400px] md:w-[450px] md:h-[550px] mx-auto text-white text-center mt-4 md:mt-8"}>
                    <div className={"w-[80%] flex justify-center mx-auto"}>
                        <ImageWithSkeleton src={SignInImage}/>
                    </div>
                    <h1 className={"text-4xl md:text-6xl font-bold my-3"}>Welcome Back</h1>
                    <p className={"text-sm tracking-tight space-y-2"}>Log in to connect with verified professionals, manage projects, and collaborate easily. Lunq offers secure payments, direct contracts, and zero commission—giving you full control over your work and earnings.</p>
                </div>
            </AuthLayout.Left>
            <AuthLayout.Right className={"w-full items-center flex h-full"} >
                <div className={"w-[300px] h-[200px] md:w-[450px] md:h-[550px] mx-auto"}>
                    <Card className="w-full max-w-sm shadow-md">
                        <CardHeader>
                            <CardTitle className={"text-center "}>Welcome back! Please enter your details.</CardTitle>
                            {/*<CardDescription>*/}
                            {/*    Enter your email below to login to your account*/}
                            {/*</CardDescription>*/}
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
                                                className="py-5 rounded-full w-full bg-white text-gray-800 "
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center relative">
                                            <Label htmlFor="password">Password</Label>
                                            {
                                                isPasswordOn? (
                                                    <div
                                                        className={"cursor-pointer absolute right-4 top-9"}
                                                        onClick={() => setIsPasswordOn(!isPasswordOn)}
                                                    >
                                                        <EyeIcon size={19} />
                                                    </div>
                                                ):(
                                                    <div
                                                        className={"cursor-pointer absolute right-4 top-9"}
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
                                                className={"py-5 rounded-full w-full bg-white text-gray-800"}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                            <Link
                                                to={"/forgot-password"}
                                                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                            >
                                                Forgot your password?
                                            </Link>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button disabled={isLoading} onClick={() => signIn()} type="submit" className="w-full rounded-full py-5 bg-linear-to-l from-[#0170DA] to-[#002282]">
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                            <div className="p-[1px] rounded-full w-full bg-gradient-to-r from-[#4A58F9] to-[#8BEAFE]">
                                <Button onClick={() => googleAuth()} variant="outline" className="w-full rounded-full py-5">
                                    <div className={"w-[20px] h-[20px]"}>
                                        <ImageWithSkeleton
                                            src={GoogleImage}
                                        />
                                    </div>
                                    Login with Google
                                </Button>
                            </div>
                            <CardTitle className="text-center text-sm mt-2 font-normal text-gray-600">
                                Don’t have an account?{" "}
                                <span className="font-semibold bg-gradient-to-r from-[#002282] to-[#0170DA] bg-clip-text text-transparent hover:opacity-80 transition-all duration-300">
                                    <Link to="/sign-up">Sign Up</Link>
                                </span>
                            </CardTitle>
                        </CardFooter>
                    </Card>
                </div>
            </AuthLayout.Right>
        </AuthLayout>
    )
}