import Spinner from "./ui/spinner";

export default function LoadingScreen() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Spinner className="size-10 fill-indigo-500 text-gray-300 duration-1000 ease-linear" />
    </div>
  );
}
