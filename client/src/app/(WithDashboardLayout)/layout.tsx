"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  Home,
  Settings,
  BarChart3,
  User,
  Users,
  LogOut,
  BriefcaseMedical,
  Pill,
  User2,
} from "lucide-react";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const role = user?.role || "customer";

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(logout());
        localStorage.removeItem("accessToken");
        router.push("/login");
        toast.success("Logged out successfully");
        Swal.fire("Successful!", "You have been logged out.", "success");
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems =
    role === "customer"
      ? [
          { icon: Home, text: "Dashboard", path: "/dashboard" },
          { icon: BarChart3, text: "My Orders", path: "/dashboard/my-orders" },
          { icon: User, text: "Profile", path: "/dashboard/my-profile" },
          { icon: Settings, text: "Settings", path: "/dashboard/settings" },
        ]
      : [
          { icon: Home, text: "Dashboard", path: "/dashboard" },
          {
            icon: BarChart3,
            text: "Order Management",
            path: "/dashboard/order-management",
          },
          { icon: BarChart3, text: "My Orders", path: "/dashboard/my-orders" },
          {
            icon: Users,
            text: "User Management",
            path: "/dashboard/user-management",
          },
          {
            icon: BriefcaseMedical,
            text: "Medicine Management",
            path: "/dashboard/medicine-management",
          },
          {
            icon: IoAdd,
            text: "Add Medicine",
            path: "/dashboard/add-medicine",
          },
          {
            icon: User,
            text: "Profile",
            path: "/dashboard/my-profile",
          },
          {
            icon: Settings,
            text: "Settings",
            path: "/dashboard/settings",
          },
        ];

  return (
    <div>
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <Link
            href="/"
            className="flex items-center gap-x-2 text-xl font-semibold text-blue-400"
          >
            <Pill />
            <h1>Medi Mart</h1>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md lg:hidden hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item, index) => {
            const isActive =
              item.path === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.path);

            return (
              <Link
                key={index}
                href={item.path}
                className={`flex items-center px-4 py-3 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-blue-50 text-primary"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.text}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 fixed bottom-2 w-full">
          <button
            onClick={handleLogout}
            className="flex cursor-pointer items-center px-4 py-3 text-sm rounded-lg bg-gray-100 text-gray-700 hover:bg-blue-50 w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navigation */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-40">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md lg:hidden hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>

            {/* Right Section */}
            <div className="ml-auto flex items-center gap-4 relative" ref={dropdownRef}>
             
              {/* Profile Dropdown */}
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-full transition"
              >
                <User2/>
              </button>
              <AnimatePresence>
                {isProfileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-14 w-60 bg-white border border-gray-200 rounded-xl shadow-xl z-50"
                  >
                    <div className="p-4 border-b">
                      <p className="text-sm font-semibold">{user?.name || "User Name"}</p>
                      <p className="text-xs text-gray-500">{user?.email || "user@email.com"}</p>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/dashboard/my-profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="py-4 px-6 lg:px-8 mt-16">{children}</main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
