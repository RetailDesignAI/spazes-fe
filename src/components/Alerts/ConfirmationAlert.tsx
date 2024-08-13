import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type ConfirmationAlertProps = {
  onAccept: () => void;
  title: string;
  description: string;
  rejectButtonText: string;
  acceptButtonText: string;
  triggerElement: React.ReactNode;
};

const ConfirmationAlert = ({
  onAccept,
  title,
  description,
  rejectButtonText,
  acceptButtonText,
  triggerElement,
}: ConfirmationAlertProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{triggerElement}</AlertDialogTrigger>
      <AlertDialogContent className="dark">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{rejectButtonText}</AlertDialogCancel>
          <AlertDialogAction
            className={`bg-gradient-to-r from-[#7D4AEA] to-[#9B59B6] shadow-lg shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50`}
            onClick={onAccept}
          >
            {acceptButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationAlert;
