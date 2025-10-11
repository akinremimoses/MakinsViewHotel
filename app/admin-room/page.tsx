
import { redirect } from "next/navigation";
import { verifyUser } from "@/actions/verifyuser";
import AdminRoomList from "@/components/AdminRoomList";

const AdminRoomPage = async () => {
  const user = await verifyUser();

  // Check authentication  annd the role whether admin or d uder
  if (!user.success || user.role !== "admin") {
    redirect("/login");
  }
  

  return <AdminRoomList />;
};

export default AdminRoomPage;


