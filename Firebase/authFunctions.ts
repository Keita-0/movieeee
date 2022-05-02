import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { auth } from "../Firebase/firebase";
import { signInUserState } from "../store/movieSearchState";

/**
 * SignInの状態を監視する
 */
export const useAuth = () => {
  const [signInUser, setSignInUser] = useRecoilState(signInUserState);
  const resetStatus = useResetRecoilState(signInUserState);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setSignInUser({
          uid: authUser.uid,
        });
      } else {
        resetStatus();
      }
    });
    return () => unSub();
  }, [setSignInUser, resetStatus]);

  return signInUser;
};
