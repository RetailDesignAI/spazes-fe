import { useEffect, useRef, useState } from 'react';
import { Download, Plus, Text, ThumbsDown, ThumbsUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CheckIcon } from '@/components/ui/checkIcon';
import NewGenerationModal from '@/components/NewGenerationModal';
import { useNavigate, useParams } from 'react-router-dom';
import { fadeAnimation } from '@/lib/animations';
import ProjectHeader from './ProjectHeader';
import api from '@/api/axiosConfig';
import { useToast } from '@/components/ui/use-toast';
import CustomImage from '@/components/ui/image';
import MainImage from './MainImage';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import EditDropdown from './EditDropdown';
import EditPrompts from './EditPrompts';
import { DropdownValues, Feedback } from './project.types';
import { setImages, changeSelectedImage } from '@/providers/redux/project/projectSlice';
import CustomTooltip from '@/components/ui/customTooltip';
import { setFullLoader } from '@/providers/redux/loaders/loadersSlice';
import FullScreenLoader from '@/components/FullScreenLoader';
import PromptCard from '@/components/PromptCard';
import { CardType } from '@/components/PromptCard/promptCards.types';
import useDebouncedValue from '@/hooks/useDebounceValue';

export default function Project() {
  const { toast } = useToast();
  const { id: projectId } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { images, selectedImage } = useAppSelector((state) => state.project);
  const { fullPageLoader } = useAppSelector((state) => state.loaders);
  const [liked, setLiked] = useState<Feedback>(Feedback.Neutral);
  const [showHeading, setShowHeading] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [dropdownValue, setDropdownValue] = useState(DropdownValues.Prompt);
  const [open, setOpen] = useState<boolean>(false);
  const [sameProject, setSameProject] = useState<boolean>(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const debouncedName = useDebouncedValue(projectName, 500);

  useEffect(() => {
    if (imageRefs.current[selectedImage]) {
      imageRefs.current[selectedImage]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }, [selectedImage]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        dispatch(setFullLoader(true));
        const res = await api.get(`/projects/${projectId}`);
        const { project } = res.data;
        setProjectName(project.name);
        dispatch(setImages(project.images));
      } catch (error: any) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message,
          variant: 'destructive',
        });
        navigate(`/projects`);
      } finally {
        dispatch(setFullLoader(false));
      }
    };
    dispatch(setImages([]));
    fetchProject();
  }, [toast, projectId, dispatch, navigate]);

  useEffect(() => {
    const renameProject = async () => {
      if (debouncedName === '') return;
      try {
        await api.put(`/projects/${projectId}/rename`, {
          name: debouncedName,
        });
      } catch (error: any) {
        toast({
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message,
          variant: 'destructive',
        });
      }
    };

    renameProject();
  }, [debouncedName, projectId, toast]);

  const handleDropdownValue = (value: DropdownValues) => {
    setDropdownValue(value);
  };

  const changeSameProject = (value: boolean) => {
    setSameProject(value);
  };

  const handleDialogChange = (value: boolean) => {
    setOpen(value);
    setTimeout(() => {
      if (!value) setSameProject(false);
    }, 500);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = images[selectedImage]?.url;
    link.download = 'image.webp';
    link.click();
  };

  if (fullPageLoader) {
    return <FullScreenLoader />;
  }

  return (
    <div className="w-full min-h-screen bg-custom-primary">
      <ProjectHeader title={projectName} setProjectName={setProjectName} />
      <div className="h-[calc(100vh-60px)] w-full flex justify-center items-center overflow-auto">
        <div className="flex flex-col lg:flex-row justify-center w-[80%] min-w-[375px] gap-5 p-4 bg-[#121213] lg:py-15">
          <div className="flex flex-col items-center justify-center gap-8 lg:w-3/5">
            <motion.div {...fadeAnimation} className="w-full relative min-w-[375px]" style={{ aspectRatio: '16/9' }}>
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
                    className="absolute top-0 w-full px-4 flex items-center justify-between text-md rounded-t-lg image-heading bg-[#000000d0] text-white z-50 text-xs gap-3"
                    onMouseEnter={() => setShowHeading(true)}
                    onMouseLeave={() => setShowHeading(false)}
                  >
                    <p className="line-clamp-2">{images[selectedImage]?.prompt}</p>
                    <p className="flex gap-3">
                      <span>
                        <CustomTooltip
                          tooltipContent="Like"
                          triggerElement={
                            liked === Feedback.Like ? (
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
                            )
                          }
                        />
                      </span>
                      <span>
                        <CustomTooltip
                          tooltipContent="Dislike"
                          triggerElement={
                            liked === Feedback.Dislike ? (
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
                            )
                          }
                        />
                      </span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
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
                      prompt={images[selectedImage]?.prompt}
                      type={CardType.Popover}
                    />
                  }
                />
              </div>
              <MainImage setShowHeading={setShowHeading} />
            </motion.div>
            <motion.div {...fadeAnimation} className="flex w-full max-w-full gap-4 items-center">
              <div className="flex justify-start gap-4 overflow-x-auto overflow-y-clip scrollbar-hidden">
                {images.map((image, index) => (
                  <div
                    key={image.prompt}
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="relative flex-shrink-0 cursor-pointer group bg-black/50 w-[100px] h-[56.25px] rounded-lg"
                    onClick={() => dispatch(changeSelectedImage(index))}
                  >
                    <CustomImage alt="Thumbnail 1" className="rounded-lg object-cover w-full h-full" src={image?.url} />
                    {index === selectedImage && (
                      <motion.div
                        {...fadeAnimation}
                        className="absolute w-full h-full inset-0 flex items-center justify-center transition-opacity rounded-lg bg-black/50"
                      >
                        <CheckIcon className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
              <Dialog open={open} onOpenChange={handleDialogChange}>
                <DialogTrigger>
                  <div className="relative border border-gray-500 hover:border-[#7D4AEA] cursor-pointer group w-[100px] h-[56.25px] rounded-lg">
                    <motion.div
                      {...fadeAnimation}
                      className="absolute inset-0 flex items-center justify-center transition-opacity rounded-lg bg-black/50"
                    >
                      <Plus color="white" />
                    </motion.div>
                  </div>
                </DialogTrigger>
                <NewGenerationModal
                  handleDialogChange={handleDialogChange}
                  sameProject={sameProject}
                  setSameProject={changeSameProject}
                />
              </Dialog>
            </motion.div>
          </div>
          <div className="w-full lg:w-2/5">
            <EditDropdown value={dropdownValue} changeValue={handleDropdownValue} />
            <EditPrompts dropdownValue={dropdownValue} />
          </div>
        </div>
      </div>
    </div>
  );
}
