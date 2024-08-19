import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/components/ui/use-toast';
import api from '@/api/axiosConfig';
import { setUser } from '@/providers/redux/auth/userSlice';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '@/lib/constants/routes';

interface IFormInput {
  otp: string;
}

type OtpProps = {
  hideAskOTP: () => void;
};

const OTPComponent = ({ hideAskOTP }: OtpProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);

  const form = useForm<IFormInput>({
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { otp } = data;
      const res = await api.post('/auth/validate', { email, otp });
      const { user } = res.data;
      dispatch(setUser(user));
      return navigate(AppRoutes.Home);
    } catch (err: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: err.response.data.message,
        variant: 'destructive',
      });
      hideAskOTP();
    }
  };

  return (
    <>
      <Form {...form}>
        <h3 className="font-bold">Verify your account</h3>
        <p className="text-[12px] text-center text-custom-gray">
          We emailed you the six digit code to {email} <br /> Enter the code below to confirm your email address
        </p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" variant={'gradient'}>
            Verify
          </Button>
        </form>
      </Form>
    </>
  );
};

export default OTPComponent;
