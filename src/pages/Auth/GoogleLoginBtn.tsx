import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { LoginSources } from './auth.types';
import api from '@/api/axiosConfig';
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google';

const GoogleLoginBtn = () => {
  const { toast } = useToast();
  const parentRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  useEffect(() => {
    const updateButtonWidth = () => {
      if (parentRef.current) {
        setButtonWidth(parentRef.current.offsetWidth);
      }
    };
    updateButtonWidth();
    window.addEventListener('resize', updateButtonWidth);

    return () => {
      window.removeEventListener('resize', updateButtonWidth);
    };
  }, []);

  const googleLoginSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    const googleAccessToken = credentialResponse.credential;
    try {
      const res = await api.post('/auth/login', {
        data: {
          googleAccessToken,
        },
        source: LoginSources.Google,
      });
      console.log(res.data);
    } catch (err) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'Please try again',
        variant: 'destructive',
      });
    }
  };

  const googleLoginError = () => {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: 'Please try again',
      variant: 'destructive',
    });
  };

  return (
    <div className="w-full" ref={parentRef}>
      <GoogleLogin
        onSuccess={(credentialResponse) => googleLoginSuccess(credentialResponse)}
        onError={googleLoginError}
        useOneTap
        width={buttonWidth}
      />
    </div>
  );
};

export default GoogleLoginBtn;
