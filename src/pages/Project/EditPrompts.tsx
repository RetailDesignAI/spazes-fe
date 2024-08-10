import { FormEvent, useState } from 'react';
import api from '@/api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownValues } from './project.types';
import { useToast } from '@/components/ui/use-toast';
import Spinner from '@/components/ui/spinner';
import { addImages, changeSelectedImage } from '@/providers/redux/project/projectSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetImageEditorState, selectShape } from '@/providers/redux/project/imageEditorSlice';

const EditPrompts = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { images, selectedImage, dropdownValue } = useAppSelector((state) => state.project);
  const { id: projectId } = useParams<{ id: string }>();
  const [searchPrompt, setSearchPrompt] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    dispatch(selectShape(''));
    e.preventDefault();
    try {
      setIsLoading(true);
      if (dropdownValue === DropdownValues.Prompt) {
        const res = await api.post('/edit/search-replace', {
          imageId: images[selectedImage]._id,
          searchPrompt,
          replacePrompt: prompt,
          projectId,
        });
        const image = res.data.image;
        dispatch(addImages([image]));
        dispatch(changeSelectedImage(0));
      } else if (dropdownValue === DropdownValues.Structure) {
        const res = await api.post('/edit/structure', {
          imageId: images[selectedImage]._id,
          prompt,
          projectId,
        });
        const image = res.data.image;
        dispatch(addImages([image]));
        dispatch(changeSelectedImage(0));
      } else if (dropdownValue === DropdownValues.Image) {
        const canvasElement = document.querySelector('canvas') as HTMLCanvasElement;
        const maskUrl = canvasElement.toDataURL('image/png');
        const res = await api.post('/edit/image', {
          imageId: images[selectedImage]._id,
          maskUrl: maskUrl,
          prompt,
          projectId,
        });
        const image = res.data.image;
        dispatch(addImages([image]));
        dispatch(changeSelectedImage(0));
        dispatch(resetImageEditorState());
      }
    } catch (error: any) {
      console.log(error);

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
            placeholder="Type your search prompt here..."
            onChange={(e) => setSearchPrompt(e.target.value)}
            className="w-full p-2 bg-custom-secondary outline-none resize-none text-sm mt-2 h-[100px] rounded-md"
          ></textarea>
        )}
        <textarea
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your prompt here..."
          className="w-full p-2 bg-custom-secondary outline-none resize-none text-sm mt-2 h-[100px] rounded-md"
        ></textarea>
        <Button
          type="submit"
          className="w-full rounded-md mt-2 bg-gradient-to-r from-[#7D4AEA] to-[#9B59B6] shadow-lg shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50"
        >
          {isLoading ? <Spinner className="fill-white" /> : 'Generate'}
        </Button>
      </form>
    </div>
  );
};

export default EditPrompts;
