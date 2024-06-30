import { FormEvent, useState } from 'react';
import api from '@/api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownValues, EditPromptsProps } from './project.types';
import { useToast } from '@/components/ui/use-toast';
import Spinner from '@/components/ui/spinner';

const EditPrompts = ({ dropdownValue, url, addImage, changeSelectedImage, totalImages }: EditPromptsProps) => {
  const { toast } = useToast();
  const { id: projectId } = useParams<{ id: string }>();
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (dropdownValue) {
        const res = await api.post('/edit/search-replace', {
          url,
          searchPrompt,
          replacePrompt: prompt,
          projectId,
        });
        const image = res.data.image;
        addImage(image);
        changeSelectedImage(totalImages);
      }
    } catch (error: any) {
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.response.data.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {dropdownValue === DropdownValues.Prompt && (
          <textarea
            required
            placeholder="Type your search prompt here..."
            onChange={(e) => setSearchPrompt(e.target.value)}
            className="w-full p-2 bg-custom-secondary outline-none resize-none text-sm mt-2 h-[75px] rounded-md"
          ></textarea>
        )}
        <textarea
          required
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your replace prompt here..."
          className="w-full p-2 bg-custom-secondary outline-none resize-none text-sm mt-2 h-[75px] rounded-md"
        ></textarea>
        <Button
          type="submit"
          className="w-full rounded-md mt-2 bg-gradient-to-r from-[#7D4AEA] to-[#9B59B6] shadow-lg shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50"
        >
          {isLoading ? <Spinner className="text-white" /> : 'Generate'}
        </Button>
      </form>
    </div>
  );
};

export default EditPrompts;
