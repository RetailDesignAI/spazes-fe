import { Button } from '@/components/ui/button';
import FormErrorMessage from '@/components/ui/formErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppRoutes } from '@/lib/constants/routes';
import { AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { fadeAnimation } from '@/lib/animations';
import { motion } from 'framer-motion';
import GoogleLoginBtn from './GoogleLoginBtn';
import { useState } from 'react';
import OTP from './OTP';
import { setEmail } from '@/providers/redux/auth/authSlice';
import { useAppDispatch } from '@/hooks/useRedux';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api/axiosConfig';

interface IFormInput {
  email: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [askOTP, setAskOTP] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { email } = data;
      const res = await api.post('/auth/login/otp', { email });
      const { success } = res.data;
      if (success) {
        dispatch(setEmail(email));
        setAskOTP(true);
      }
    } catch (err: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: err.response.data.message,
        variant: 'destructive',
      });
    }
  };

  const hideAskOTP = () => setAskOTP(false);

  return (
    <motion.div
      className={`w-full max-w-[400px] p-6 space-y-6 bg-card rounded-xl shadow-lg dark auth ${
        askOTP && 'flex items-center justify-center flex-col'
      }`}
      {...fadeAnimation}
    >
      {askOTP ? (
        <OTP hideAskOTP={hideAskOTP} />
      ) : (
        <>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground text-[14px] mt-1">Welcome back! Time to shape your next masterpiece.</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                className="mt-2"
                placeholder="Enter your email"
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              <AnimatePresence>
                {errors.email?.type === 'required' && <FormErrorMessage text="Email is required" />}
                {errors.email?.type === 'pattern' && <FormErrorMessage text="Invalid email address" />}
              </AnimatePresence>
            </div>
            <Button type="submit" className="w-full bg-custom-secondary">
              Get OTP
            </Button>
            <p className="text-[13px]">
              Don't have an account?
              <Link to={AppRoutes.Signup}>
                <span className="text-violet-500 font-semibold cursor-pointer ml-1">Sign Up</span>
              </Link>
            </p>
          </form>
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-muted" />
            <span className="mx-4 bg-background px-2 text-muted-foreground text-[12px]">OR</span>
            <div className="flex-1 border-t border-muted" />
          </div>
          <GoogleLoginBtn />
        </>
      )}
    </motion.div>
  );
};

export default Login;
