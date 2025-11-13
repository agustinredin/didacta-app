import type { CredentialResponse } from "@react-oauth/google";
import { signInWithGoogle } from '../auth';

type Options = {
  onLoggedIn?: (data: unknown) => void;
  onError?: (e: unknown) => void;
}

export const onGoogleSuccess =
  (opts: Options = {}) =>
  async (res: CredentialResponse) => {
    try {
      const idToken = res.credential;
      if (!idToken) return;
      const data = await signInWithGoogle(idToken);
      opts.onLoggedIn?.(data);
    } catch (e) {
      opts.onError?.(e);
    }
  }