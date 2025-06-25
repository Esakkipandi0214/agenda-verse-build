
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';


interface SocialLoginButtonsProps {
  isLoading?: boolean;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  isLoading = false 
}) => {
  //  const { loginWithRedirect } = useAuth0();
  const handleGitHubLogin = () => {
  const clientId = "Ov23licq6RJwZGiYK9jL";
  const redirectUri = `${import.meta.env.VITE_API_BASE_URL}/auth/github/callback`;
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}`);
};

const handleGoogleLogin = () => {
  const clientId = "504918774140-53e4tvemnpnvcs16qmk3t3gbm90evqdb.apps.googleusercontent.com";
  const redirectUri = `${import.meta.env.VITE_API_BASE_URL}/auth/google/callback`;
  const scope = "openid profile email";
  const responseType = "code";

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

  window.location.assign(googleAuthUrl);
};
  return (
  <div className="space-y-4">
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <Separator className="w-full" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-background px-2 text-muted-foreground">
        Or continue with
      </span>
    </div>
  </div>

  {/* GitHub Login Button */}
  <Button
    type="button"
    variant="outline"
    className="w-full relative"
    onClick={handleGitHubLogin}
    disabled={isLoading}
  >
    <svg
      className="w-4 h-4 mr-2"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.4 7.86 10.94.58.11.79-.25.79-.56v-2.1c-3.2.7-3.88-1.39-3.88-1.39-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.26 3.4.96.11-.75.41-1.26.75-1.55-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.3 1.19-3.11-.12-.3-.52-1.51.11-3.14 0 0 .98-.31 3.21 1.18a11.2 11.2 0 0 1 2.92-.39c.99.01 1.99.13 2.92.39 2.22-1.49 3.2-1.18 3.2-1.18.63 1.63.24 2.84.12 3.14.74.81 1.18 1.85 1.18 3.11 0 4.44-2.7 5.42-5.27 5.7.42.37.8 1.1.8 2.22v3.29c0 .31.21.68.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
    </svg>
    Continue with GitHub
  </Button>

  {/* Google Login Button */}
  <Button
    type="button"
    variant="outline"
    className="w-full relative"
    onClick={handleGoogleLogin}
    disabled={isLoading}
  >
    <svg
      className="w-4 h-4 mr-2"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
    Continue with Google
  </Button>
</div>

  );
};

export default SocialLoginButtons;
