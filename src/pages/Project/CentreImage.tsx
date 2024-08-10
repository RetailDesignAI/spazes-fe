import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainImage from './MainImage';
import { Download, Text, ThumbsDown, ThumbsUp } from 'lucide-react';
import CustomTooltip from '@/components/ui/customTooltip';
import PromptCard from '@/components/PromptCard';
import { CardType } from '@/components/PromptCard/promptCards.types';
import { useAppSelector } from '@/hooks/useRedux';
import { fadeAnimation } from '@/lib/animations';
import { DropdownValues, FeedbackTypes } from './project.types';
import EditorButtons from './EditorButtons';
import api from '@/api/axiosConfig';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import CommentModal from './CommentModal';

const CentreImage = () => {
  const { toast } = useToast();
  const { images, selectedImage, dropdownValue } = useAppSelector((state) => state.project);
  const [showHeading, setShowHeading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackTypes>(FeedbackTypes.NONE);

  const selectedImageObj = useMemo(() => {
    return images[selectedImage] || null;
  }, [images, selectedImage]);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = selectedImageObj?.url;
    link.download = 'image.webp';
    link.click();
  };

  const handleLike = async () => {
    try {
      await api.post('/feedback', {
        imageId: selectedImageObj?._id,
        isLiked: true,
      });
      setFeedback(FeedbackTypes.LIKE);
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

  const handleDialogChange = (value: boolean) => {
    setOpen(value);
  };

  return (
    <div>
      <motion.div {...fadeAnimation} className="w-full relative min-w-[375px]" style={{ aspectRatio: '16/9' }}>
        <AnimatePresence>
          {showHeading && dropdownValue !== DropdownValues.Image && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '50px' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                type: 'just',
                duration: 0.15,
              }}
              className="absolute top-0 w-full px-4 flex items-center justify-between text-md rounded-t-lg image-heading bg-[#000000d0] text-white z-50 text-xs gap-3"
              onMouseEnter={() => setShowHeading(true)}
              onMouseLeave={() => setShowHeading(false)}
            >
              <p className="line-clamp-2">{selectedImageObj?.prompt}</p>
              <p className="flex gap-3">
                <span>
                  <CustomTooltip
                    tooltipContent="Like"
                    triggerElement={
                      <ThumbsUp
                        onClick={handleLike}
                        fill={feedback !== FeedbackTypes.LIKE ? 'transparent' : '#9b59b6'}
                        strokeWidth={2}
                        className={`w-4 h-4 duration-150 cursor-pointer hover:text-white ${
                          feedback !== FeedbackTypes.LIKE ? 'text-custom-gray' : '#9b59b6 stroke-[#9b59b6]'
                        }`}
                      />
                    }
                  />
                </span>
                <span>
                  <Dialog open={open} onOpenChange={handleDialogChange}>
                    <DialogTrigger>
                      <CustomTooltip
                        tooltipContent="Dislike"
                        triggerElement={
                          <ThumbsDown
                            onClick={() => setOpen(true)}
                            fill={feedback !== FeedbackTypes.DISLIKE ? 'transparent' : '#eb4b4b'}
                            strokeWidth={2}
                            className={`w-4 h-4 duration-150 cursor-pointer hover:text-white ${
                              feedback !== FeedbackTypes.DISLIKE ? 'text-custom-gray' : '#eb4b4b stroke-[#eb4b4b]'
                            }`}
                          />
                        }
                      />
                    </DialogTrigger>
                    <CommentModal
                      handleDialogChange={handleDialogChange}
                      handleFeedbackChange={setFeedback}
                      imageId={selectedImageObj?._id}
                    />
                  </Dialog>
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {dropdownValue !== DropdownValues.Image && (
          <div className="absolute bottom-2 right-2 flex z-50 gap-2">
            <CustomTooltip
              tooltipContent="Download Image"
              triggerElement={
                <p onClick={downloadImage} className="p-2 bg-[#000000d0] rounded-full cursor-pointer">
                  <Download className="w-4 h-4" />
                </p>
              }
            />
            <CustomTooltip
              tooltipContent="Show Prompt"
              triggerElement={
                <PromptCard
                  triggerElement={
                    <p className="p-2 bg-[#000000d0] rounded-full cursor-pointer">
                      <Text className="w-4 h-4" />
                    </p>
                  }
                  prompt={selectedImageObj?.prompt}
                  type={CardType.Popover}
                />
              }
            />
          </div>
        )}
        <MainImage setShowHeading={setShowHeading} />
      </motion.div>
      <EditorButtons />
    </div>
  );
};

export default CentreImage;
