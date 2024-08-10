import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import FileInput from '@/components/FileInput';
import { fadeAnimation } from '@/lib/animations';
import { useToast } from '@/components/ui/use-toast';
import { HomeInputProps, Loading } from './home.types';
import CustomTooltipButton from '@/components/ui/customTooltipButton';
import Spinner from '@/components/ui/spinner';
import { Send, Text } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadIcon from '@/components/ui/uploadicon';
import PromptsList from '@/components/PromptsList';
import api from '@/api/axiosConfig';
import EditDropdown from '../Project/EditDropdown';

const HomeInput = ({ handleImageGeneration, loading, setLoading }: HomeInputProps) => {
  const PROMPT_SIZE_LIMIT: number = 500;
  const { toast } = useToast();
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);

  const generatePrompts = async () => {
    if (prompt === '' || prompt.length > PROMPT_SIZE_LIMIT) {
      toast({
        title: 'Invalid prompt',
        description: 'Please enter a valid prompt',
        variant: 'destructive',
      });
      return;
    }
    setLoading(Loading.Prompts);
    try {
      const res = await api.post('/prompts/generate?n=4', {
        requirements: prompt,
      });
      const { prompts } = res.data;
      setGeneratedPrompts(prompts);
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.response.data.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(Loading.None);
      console.log(file);
    }
  };

  const handlePromptChange = (prompt: string) => {
    setPrompt(prompt);
  };

  const handleFileChange = (file: File | null) => {
    setFile(file);
  };

  const generateImages = async () => {
    if (prompt === '') {
      toast({
        title: 'Invalid prompt',
        description: 'Please enter a valid prompt',
        variant: 'destructive',
      });
      return;
    }
    handleImageGeneration([prompt], Loading.SinglePrompt);
  };

  return (
    <div key="1" className="flex flex-col h-full w-full items-center justify-center bg-[#121213] p-4">
      <AnimatePresence>{uploadImage && <FileInput handleFileChange={handleFileChange} />}</AnimatePresence>
      <motion.div
        {...fadeAnimation}
        className="flex w-full max-w-4xl flex-col space-y-6 rounded-lg bg-[#1C1E21] p-4 text-white"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-1">
            <textarea
              value={prompt}
              maxLength={500}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              className="w-full pr-4 font-medium bg-transparent outline-none resize-none text-l"
            ></textarea>
            {/* <textarea
              value={prompt}
              maxLength={500}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your prompt here..."
              className="w-full px-4 font-medium bg-transparent outline-none resize-none text-l border-l border-[#9b9b9b35]"
            ></textarea> */}
          </div>
          <div className="flex items-center space-x-2">
            <CustomTooltipButton
              onClick={generatePrompts}
              buttonContent={loading === Loading.Prompts ? <Spinner className="fill-white" /> : <Text className="w-4 h-4" />}
              tooltipContent="Generate Prompts"
            />
            <CustomTooltipButton
              onClick={generateImages}
              buttonContent={
                loading === Loading.SinglePrompt ? <Spinner className="fill-white" /> : <Send className="w-4 h-4" />
              }
              tooltipContent="Generate Images"
            />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="relative flex gap-2 items-center">
            <Button
              onClick={() => setUploadImage((prev) => !prev)}
              className="flex items-center space-x-2 rounded-lg bg-[#313338] p-3 text-sm"
            >
              <UploadIcon className="h-4 w-4 text-[#B1B1B3]" />
              <span>Upload</span>
            </Button>
            {uploadImage && <EditDropdown />}
          </div>
          <p className="text-[#B1B1B3] hover:text-white">
            {prompt.length}/{PROMPT_SIZE_LIMIT}
          </p>
        </div>
      </motion.div>
      {generatedPrompts.length > 0 && (
        <AnimatePresence>
          <motion.div {...fadeAnimation} className="flex flex-col w-full max-w-4xl p-6 space-y-6 text-white rounded-lg">
            <PromptsList
              prompts={generatedPrompts}
              selectPrompt={handlePromptChange}
              fetchingPrompts={loading === Loading.Prompts}
            />
            <Button
              onClick={() => handleImageGeneration(generatedPrompts, Loading.ImagineAll)}
              className="bg-gradient-to-r from-[#7D4AEA] to-[#9B59B6] text-white shadow-lg shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50"
            >
              {loading === Loading.ImagineAll ? <Spinner className="fill-white" /> : 'Imagine All'}
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default HomeInput;
