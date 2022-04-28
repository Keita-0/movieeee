import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRecoilState } from "recoil";
import { loginFlg } from "../store/movieSearchState";

export const useAuth = () => {
  const auth = getAuth();
  const [isSignedIn, setIsSignedIn] = useRecoilState(loginFlg);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("ログインしています。");
      setIsSignedIn(true);
    } else {
      console.log("ログアウト中です。");
      setIsSignedIn(false);
    }
  });
};
