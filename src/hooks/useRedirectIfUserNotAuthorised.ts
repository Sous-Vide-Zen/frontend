import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

export const useRedirectIfUserNotAuthorised = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const router = useRouter();

  if (!isAuth) router.push('/404');
}
