import { TbSettings } from "react-icons/tb";
import { FiFolder } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";
import { PiShieldCheckBold } from "react-icons/pi";

export  const AdminSidebarItems: {icon: any; label: string; path: string;}[] = [
  { icon: <TbSettings />, label: "Overview", path: "/admin/overview" },
  { icon: <FiFolder />, label: "Appointments", path: "/admin/appointments" },
  { icon: <FiFileText />, label: "Clients", path: "/admin/clients" },
  { icon: <FiFileText />, label: "Admins", path: "/admin/admins" },
  { icon: <GoDeviceDesktop />, label: "Services", path: "/admin/services" },
  { icon: <PiShieldCheckBold />, label: "Payments", path: "/admin/payments" },
  { icon: <PiShieldCheckBold />, label: "Settings", path: "/admin/settings" },
];