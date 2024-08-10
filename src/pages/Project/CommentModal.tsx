import { useState } from 'react';
import api from '@/api/axiosConfig';
import { Button } from '@/components/ui/button';
import { FeedbackTypes } from './project.types';
import { useToast } from '@/components/ui/use-toast';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type CommentModalProps = {
  handleFeedbackChange: (feedback: FeedbackTypes) => void;
  handleDialogChange: (dialog: boolean) => void;
  imageId: string;
};

const CommentModal = ({ handleFeedbackChange, handleDialogChange, imageId }: CommentModalProps) => {
  const { toast } = useToast();
  const [comment, setComment] = useState<string>('');

  const handleDislike = async () => {
    try {
      await api.post('/feedback', {
        imageId,
        isLiked: false,
        comment,
      });
      handleFeedbackChange(FeedbackTypes.DISLIKE);
      handleDialogChange(false);
      toast({
        title: 'Thank you for your feedback!',
        variant: 'default',
      });
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: 'Please try again later',
        variant: 'destructive',
      });
    }
  };

  return (
    <DialogContent className={`bg-[#121213]`}>
      <DialogHeader>
        <DialogTitle className="mb-8 text-white">How can improve the image generation?</DialogTitle>
      </DialogHeader>
      <DialogDescription className="text-white">
        <p>Leave your comment below.</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-transparent border-[0.05em] h-24 border-transparent p-2 text-sm duration-300 border-custom-gray outline-none my-2 resize-none rounded-md"
        ></textarea>
        <Button className="bg-[#7D4AEA]" onClick={handleDislike}>
          Submit
        </Button>
      </DialogDescription>
    </DialogContent>
  );
};

export default CommentModal;
