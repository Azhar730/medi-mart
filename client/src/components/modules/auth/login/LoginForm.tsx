/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { FieldValues } from "react-hook-form";
// import Link from "next/link";
// import Button from "@/components/utils/Button";
// import MediForm from "../../form/MediForm";
// import MediInput from "../../form/MediInput";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { loginValidation } from "./loginValidation";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { useAppDispatch } from "@/redux/hooks";
// import { setUser } from "@/redux/features/auth/authSlice";

// const LoginForm = () => {
//   const router = useRouter();
//   const [login] = useLoginMutation();
//   const dispatch = useAppDispatch();

//   const handleSubmit = async (formData: FieldValues) => {
//     const toastId = toast.loading("Logging in your account");
//     try {
//       const res = await login(formData).unwrap();
//       if (res.success) {
//         console.log(res);
//         localStorage.setItem("accessToken", res.accessToken);
//         toast.success(res.message, { id: toastId });
//         dispatch(
//           setUser({
//             user: {
//               id: res.data.id,
//               name: res.data.name,
//               email: res.data.email,
//               role: res.data.role,
//             },
//             token: res.accessToken,
//           })
//         );
//         router.push("/");
//       }
//     } catch (error: any) {
//       if (error?.status === 401) {
//         toast.error(error?.data?.message, { id: toastId });
//         return;
//       }
//       toast.error(error?.data?.message || "Something went wrong", {
//         id: toastId,
//       });
//     }
//   };
//   return (
//     <div className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-transparent">
//       <div className="w-full max-w-lg space-y-8 p-2 xs:p-6">
//         <div className="text-center space-y-2">
//           <h1 className="text-xl md:text-3xl font-bold tracking-tight text-primary">
//             Login
//           </h1>
//         </div>

//         <div className="bg-white p-3 xs:p-6 rounded-lg shadow-lg border border-gray-300">
//           <MediForm
//             className=""
//             onSubmit={handleSubmit}
//             resolver={zodResolver(loginValidation)}
//           >
//             <div className="w-full">
//               <MediInput
//                 name={"email"}
//                 label="Email"
//                 type="email"
//                 placeHolder="Enter your email"
//               />
//             </div>
//             <div className="w-full">
//               <MediInput
//                 name={"password"}
//                 label="Password"
//                 placeHolder="Enter your Password"
//                 type="text"
//               />
//             </div>
//             <div className="-mt-2 md:mt-0 w-full">
//               <Button text="Login" isFullWidth={true} />
//             </div>
//           </MediForm>
//         </div>

//         <p className="text-center text-sm text-gray-600">
//           No Account?
//           <Link
//             href="/register"
//             className="font-medium text-primary hover:text-primary ms-1"
//           >
//             Create Account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import Link from "next/link";
import Button from "@/components/utils/Button";
import MediForm from "../../form/MediForm";
import MediInput from "../../form/MediInput";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginValidation } from "./loginValidation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useRef } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null); // to access react-hook-form methods

  const handleSubmit = async (formData: FieldValues) => {
    const toastId = toast.loading("Logging in your account");
    try {
      const res = await login(formData).unwrap();
      if (res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        toast.success(res.message, { id: toastId });
        dispatch(setUser({
          user: {
            id: res.data.id,
            name: res.data.name,
            email: res.data.email,
            role: res.data.role,
          },
          token: res.accessToken,
        }));
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", { id: toastId });
    }
  };

  const handleDemoLogin = (role: "user" | "admin") => {
    const demoData =
      role === "admin"
        ? { email: "azharmahmud730@gmail.com", password: "12345678" }
        : { email: "azhar@gmail.com", password: "12345678" };

    if (formRef.current) {
      formRef.current.setValue("email", demoData.email);
      formRef.current.setValue("password", demoData.password);
      // formRef.current.handleSubmit(handleSubmit)(); // Optional: auto submit
    }
  };

  return (
    <div className="min-h-[calc(100vh-57px)] flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg space-y-8 p-2 xs:p-6">
        <div className="text-center space-y-2">
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-primary">Login</h1>
          <div className="flex justify-center gap-4 mt-2">
            <button
              onClick={() => handleDemoLogin("user")}
              className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200 transition"
            >
              Demo User
            </button>
            <button
              onClick={() => handleDemoLogin("admin")}
              className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded hover:bg-red-200 transition"
            >
              Demo Admin
            </button>
          </div>
        </div>

        <div className="bg-white p-3 xs:p-6 rounded-lg shadow-lg border border-gray-300">
          <MediForm
            ref={formRef}
            className=""
            onSubmit={handleSubmit}
            resolver={zodResolver(loginValidation)}
          >
            <MediInput
              name="email"
              label="Email"
              type="email"
              placeHolder="Enter your email"
            />
            <MediInput
              name="password"
              label="Password"
              placeHolder="Enter your Password"
              type="password"
            />
            <div className="-mt-2 md:mt-0 w-full">
              <Button text="Login" isFullWidth={true} />
            </div>
          </MediForm>
        </div>

        <p className="text-center text-sm text-gray-600">
          No Account?
          <Link
            href="/register"
            className="font-medium text-primary hover:text-primary ms-1"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
