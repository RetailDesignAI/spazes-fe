import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainImage from './MainImage';
import { Download, Text, ThumbsDown, ThumbsUp } from 'lucide-react';
import { changeFeedback } from '@/providers/redux/project/projectSlice';
import CustomTooltip from '@/components/ui/customTooltip';
import PromptCard from '@/components/PromptCard';
import { CardType } from '@/components/PromptCard/promptCards.types';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { fadeAnimation } from '@/lib/animations';
import { DropdownValues } from './project.types';
import EditorButtons from './EditorButtons';

const CentreImage = () => {
  const dispatch = useAppDispatch();
  const { images, selectedImage, dropdownValue } = useAppSelector((state) => state.project);
  const [showHeading, setShowHeading] = useState<boolean>(false);

  const selectedImageObj = useMemo(() => {
    return images[selectedImage] || null;
  }, [images, selectedImage]);

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = selectedImageObj?.url;
    link.download = 'image.webp';
    link.click();
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
                      selectedImageObj.feedback?.isGiven ? (
                        selectedImageObj.feedback.isLiked ? (
                          <ThumbsUp
                            onClick={() => dispatch(changeFeedback({ isGiven: false }))}
                            fill="#9B59B6"
                            strokeWidth={1}
                            className="w-4 h-4 duration-150 cursor-pointer stroke-[#9B59B6]"
                          />
                        ) : (
                          <ThumbsUp
                            onClick={() => dispatch(changeFeedback({ isGiven: true, isLiked: true }))}
                            fill="transparent"
                            strokeWidth={2}
                            className="w-4 h-4 duration-150 cursor-pointer text-custom-gray hover:text-white"
                          />
                        )
                      ) : (
                        <ThumbsUp
                          onClick={() => dispatch(changeFeedback({ isGiven: true, isLiked: true }))}
                          fill="transparent"
                          strokeWidth={2}
                          className="w-4 h-4 duration-150 cursor-pointer text-custom-gray hover:text-white"
                        />
                      )
                    }
                  />
                </span>
                <span>
                  <CustomTooltip
                    tooltipContent="Dislike"
                    triggerElement={
                      selectedImageObj.feedback?.isGiven ? (
                        !selectedImageObj.feedback.isLiked ? (
                          <ThumbsDown
                            onClick={() => dispatch(changeFeedback({ isGiven: false }))}
                            fill="#eb4b4b"
                            strokeWidth={1}
                            className="w-4 h-4 duration-150 cursor-pointer stroke-[#eb4b4b]"
                          />
                        ) : (
                          <ThumbsDown
                            onClick={() => dispatch(changeFeedback({ isGiven: true, isLiked: false }))}
                            fill="transparent"
                            strokeWidth={2}
                            className="w-4 h-4 duration-150 cursor-pointer text-custom-gray hover:text-white"
                          />
                        )
                      ) : (
                        <ThumbsDown
                          onClick={() => dispatch(changeFeedback({ isGiven: true, isLiked: false }))}
                          fill="transparent"
                          strokeWidth={2}
                          className="w-4 h-4 duration-150 cursor-pointer text-custom-gray hover:text-white"
                        />
                      )
                    }
                  />
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
