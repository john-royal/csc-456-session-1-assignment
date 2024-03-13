import { useUser } from "../lib/auth";

export default function ProtectedPage() {
  const user = useUser();

  return (
    <p>Hello, {user.email}. If you can see this page, you’re signed in.</p>
  );
}
