import { useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Plus,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CheckIcon } from '@/components/ui/checkIcon';
import NewGenerationModal from '@/components/NewGenerationModal';
import { useParams } from 'react-router-dom';
import { fadeAnimation } from '@/lib/animations';
import ProjectHeader from './ProjectHeader';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const images = [
  {
    heading: 'Image 1',
    url: 'https://media.istockphoto.com/id/629342510/photo/infinite-random-numbers-background.jpg?s=612x612&w=0&k=20&c=Xzi7zbCO-DsRr_JxUURy8UyORP5C2_3nLBisx0Ersh4=',
  },
  {
    heading: 'Image 2',
    url: 'https://static.scientificamerican.com/sciam/cache/file/6284F581-96A1-4D49-9F1B9F22EA328189_source.jpg?w=1200',
  },
];

enum Feedback {
  Dislike = -1,
  Neutral,
  Like,
}

export default function Project() {
  const { id: projectId } = useParams<{ id: string }>();
  const [liked, setLiked] = useState<Feedback>(Feedback.Neutral);
  console.log(projectId);

  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [showHeading, setShowHeading] = useState<boolean>(false);

  const handleNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? prev : prev + 1));
  };

  const handlePrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? prev : prev - 1));
  };

  return (
    <div className="w-full min-h-screen bg-custom-primary">
      <ProjectHeader />
      <div className="flex flex-col items-center justify-center w-full gap-8 p-4 md:mt-10 bg-[#121213]">
        <motion.div
          {...fadeAnimation}
          className="max-w-[550px] w-full relative"
        >
          <AnimatePresence>
            {showHeading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '50px' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: 'just',
                  duration: 0.15,
                }}
                className="absolute line-clamp-1 top-0 w-full px-4 flex items-center justify-between text-md rounded-t-lg image-heading bg-[#000000d0] text-white"
                onMouseEnter={() => setShowHeading(true)}
                onMouseLeave={() => setShowHeading(false)}
              >
                <p className="line-clamp-1">{images[selectedImage].heading}</p>
                <p className="flex gap-3">
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {liked === Feedback.Like ? (
                            <ThumbsUp
                              onClick={() => setLiked(Feedback.Neutral)}
                              fill="#9B59B6"
                              strokeWidth={1}
                              className="w-4 h-4 duration-150 cursor-pointer stroke-[#9B59B6]"
                            />
                          ) : (
                            <ThumbsUp
                              onClick={() => setLiked(Feedback.Like)}
                              fill="transparent"
                              strokeWidth={2}
                              className="w-4 h-4 duration-150 cursor-pointer text-custom-gray hover:text-white"
                            />
                          )}
                        </TooltipTrigger>
                        <TooltipContent className="text-white shadow border-[#2e3136] bg-custom-secondary">
                          <p>Like</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                  <span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          {liked === Feedback.Dislike ? (
                            <ThumbsDown
                              onClick={() => setLiked(Feedback.Neutral)}
                              fill="#eb4b4b"
                              strokeWidth={1}
                              className="w-4 h-4 duration-150 cursor-pointer stroke-[#eb4b4b]"
                            />
                          ) : (
                            <ThumbsDown
                              onClick={() => setLiked(Feedback.Dislike)}
                              fill="transparent"
                              strokeWidth={2}
                              className="w-4 h-4 duration-150 cursor-pointer text-custom-gray hover:text-white"
                            />
                          )}
                        </TooltipTrigger>
                        <TooltipContent className="text-white shadow border-[#2e3136] bg-custom-secondary">
                          <p>Dislike</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            className="aspect-[4/3] rounded-lg overflow-hidden"
            onMouseEnter={() => setShowHeading(true)}
            onMouseLeave={() => setShowHeading(false)}
          >
            <img
              alt="Selected Image"
              className="object-cover w-full h-full"
              height="300"
              src={images[selectedImage].url}
              width="400"
            />
            <button
              className={`${
                selectedImage === 0
                  ? 'text-gray-400'
                  : 'text-white hover:text-gray-300'
              } absolute p-1 transition-colors -translate-y-1/2 rounded-full top-1/2 left-4 bg-[#121213]`}
              onClick={handlePrevious}
              disabled={selectedImage === 0}
            >
              <ChevronLeftIcon className="w-5 h-5" />
              <span className="sr-only">Previous</span>
            </button>
            <button
              className={`${
                selectedImage === images.length - 1
                  ? 'text-gray-400'
                  : 'text-white hover:text-gray-300'
              } absolute p-1 transition-colors -translate-y-1/2 rounded-full top-1/2 right-4 bg-[#121213]`}
              disabled={selectedImage === images.length - 1}
              onClick={handleNext}
            >
              <ChevronRightIcon className="w-5 h-5" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </motion.div>
        <motion.div
          {...fadeAnimation}
          className="flex justify-center w-full max-w-full gap-4 overflow-auto"
        >
          {images.map((image, index) => (
            <div
              key={image.heading}
              className="relative flex-shrink-0 cursor-pointer group"
              onClick={() => setSelectedImage(index)}
            >
              <img
                alt="Thumbnail 1"
                className="rounded-lg object-cover w-[100px] h-[80px]"
                src={image.url}
              />
              {index === selectedImage && (
                <motion.div
                  {...fadeAnimation}
                  className="absolute inset-0 flex items-center justify-center transition-opacity rounded-lg bg-black/50"
                >
                  <CheckIcon className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </div>
          ))}
          <Dialog>
            <DialogTrigger>
              <div className="relative flex-shrink-0 border border-gray-500 hover:border-[#7D4AEA] cursor-pointer group w-[100px] h-[80px] rounded-lg">
                <motion.div
                  {...fadeAnimation}
                  className="absolute inset-0 flex items-center justify-center transition-opacity rounded-lg bg-black/50"
                >
                  <Plus color="white" />
                </motion.div>
              </div>
            </DialogTrigger>
            <NewGenerationModal />
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
}
