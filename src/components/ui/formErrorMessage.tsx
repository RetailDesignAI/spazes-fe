import { fadeAnimation } from '@/lib/animations';
import { motion } from 'framer-motion';

type FormErrorMessageProps = {
  text: string;
};

const FormErrorMessage = ({ text }: FormErrorMessageProps) => {
  return (
    <motion.div {...fadeAnimation}>
      <p className="text-red-500 text-[12px] mt-1" role="alert">
        {text}
      </p>
    </motion.div>
  );
};

export default FormErrorMessage;
