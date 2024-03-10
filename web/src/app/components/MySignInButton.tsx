import { SignInButton } from '@clerk/nextjs';

export default function MySignInButton({ children }: any) {
  return <SignInButton>{children}</SignInButton>;
}
