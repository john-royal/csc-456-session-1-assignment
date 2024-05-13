import { Outlet } from "react-router";

import Sidebar from "~/components/chat/sidebar";

function MessagesIndex() {
  return (
    <div className="flex h-[calc(100vh-72px)] w-screen border-t">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default MessagesIndex;
