import { Outlet } from "react-router";

import Sidebar from "~/components/chat/sidebar";

function MessagesIndex() {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default MessagesIndex;
