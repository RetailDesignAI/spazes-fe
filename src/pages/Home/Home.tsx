import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { fadeAnimation } from '@/lib/animations';
import { useToast } from '@/components/ui/use-toast';
import FileInput from '@/components/FileInput';
import Spinner from '@/components/ui/spinner';
import UploadIcon from '@/components/ui/uploadicon';
import PromptsList from '@/components/PromptsList';
import { AppRoutes } from '@/lib/constants/routes';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Send, Text } from 'lucide-react';
import api from '@/api/axiosConfig';

enum Loading {
  Prompts = 'Prompts',
  SinglePrompt = 'SinglePrompt',
  ImagineAll = 'ImagineAll',
  None = 'None',
}

export default function Home() {
  const PROMPT_SIZE_LIMIT: number = 500;
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState<string>('');
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [uploadImage, setUploadImage] = useState<boolean>(false);
  const [loading, setLoading] = useState<Loading>(Loading.None);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const generatePrompts = async (e: any) => {
    if (prompt === '' || prompt.length > PROMPT_SIZE_LIMIT) {
      toast({
        title: 'Invalid prompt',
        description: 'Please enter a valid prompt',
        variant: 'destructive',
      });
      return;
    }
    e.preventDefault();
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

  const handleImageGeneration = async (prompts: string[], loadingType: Loading) => {
    try {
      setLoading(loadingType);
      const res = await api.post('/projects', {
        prompts,
      });
      const { projectId } = res.data;
      navigate(`${AppRoutes.Projects}/${projectId}`);
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.response.data.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(Loading.None);
    }
  };

  return (
    <div key="1" className="flex flex-col h-full w-full items-center justify-center bg-[#121213] p-4">
      {uploadImage && (
        <AnimatePresence>
          <motion.div
            {...fadeAnimation}
            className="flex w-full max-w-4xl flex-col space-y-6 rounded-lg bg-[#1C1E21] p-4 text-white mb-2"
          >
            <FileInput handleFileChange={handleFileChange} />
          </motion.div>
        </AnimatePresence>
      )}
      <motion.div
        {...fadeAnimation}
        className="flex w-full max-w-4xl flex-col space-y-6 rounded-lg bg-[#1C1E21] p-4 text-white"
      >
        <div className="flex items-center justify-between w-full">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your prompt here..."
            className="w-full pr-4 font-medium bg-transparent outline-none resize-none font- text-l"
          ></textarea>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={generatePrompts}
                    className="bg-[#7D4AEA] text-white rounded-full p-2 border-2 border-transparent hover:border-[#7D4AEA] w-10 h-10"
                  >
                    {loading === Loading.Prompts ? <Spinner /> : <Text className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate Prompts</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    onClick={() => handleImageGeneration([prompt], Loading.SinglePrompt)}
                    className="bg-[#7D4AEA] text-white rounded-full p-2 border-2 border-transparent hover:border-[#7D4AEA] w-10 h-10"
                  >
                    {loading === Loading.SinglePrompt ? <Spinner /> : <Send className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Generate Images</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="relative">
            <Button
              onClick={() => setUploadImage((prev) => !prev)}
              className="flex items-center space-x-2 rounded-lg bg-[#313338] p-3 text-sm"
            >
              <UploadIcon className="h-4 w-4 text-[#B1B1B3]" />
              <span>Upload</span>
            </Button>
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
              {loading === Loading.ImagineAll ? <Spinner /> : 'Imagine All'}
            </Button>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
