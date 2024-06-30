import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/api/axiosConfig';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Loading } from '@/pages/Home/home.types';
import HomeInput from '@/pages/Home/HomeInput';
import { useAppDispatch } from '@/hooks/useRedux';
import { addImages, changeSelectedImage } from '@/providers/redux/project/projectSlice';

type NewGenerationModalProps = {
  handleDialogChange: (value: boolean) => void;
  sameProject: boolean;
  setSameProject: (value: boolean) => void;
};

const NewGenerationModal = ({ handleDialogChange, sameProject, setSameProject }: NewGenerationModalProps) => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<Loading>(Loading.None);

  const changeLoading = (loadingType: Loading) => {
    setLoading(loadingType);
  };

  const handleImageGeneration = async (prompts: string[], loadingType: Loading) => {
    try {
      setLoading(loadingType);
      const res = await api.post(`/projects/${projectId}/generate-more`, {
        prompts,
      });
      const newImages = res.data.images;
      dispatch(addImages(newImages));
      dispatch(changeSelectedImage(0));
      handleDialogChange(false);
      setSameProject(false);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(Loading.None);
    }
  };

  return (
    <DialogContent className={`bg-[#121213] ${sameProject && 'min-w-[75vw]'}`}>
      {sameProject ? (
        <HomeInput setLoading={changeLoading} loading={loading} handleImageGeneration={handleImageGeneration} />
      ) : (
        <DialogHeader>
          <DialogTitle className="mb-8 text-white">Generate new image in</DialogTitle>
          <div className="flex justify-between w-full">
            <button
              className="p-4 rounded-lg w-[45%] text-white bg-gradient-to-r shadow-lg from-[#7D4AEA] to-[#9B59B6] shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50 font-semibold"
              onClick={() => setSameProject(true)}
            >
              Same Project
            </button>
            <button
              onClick={() => navigate('/')}
              className="rounded-lg w-[45%] text-white bg-gradient-to-r shadow-lg from-[#7D4AEA] to-[#9B59B6] shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50 font-semibold"
            >
              New Project
            </button>
          </div>
        </DialogHeader>
      )}
    </DialogContent>
  );
};

export default NewGenerationModal;
