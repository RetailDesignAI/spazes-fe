import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/api/axiosConfig';
import { AppRoutes } from '@/lib/constants/routes';
import HomeInput from './HomeInput';
import { Loading } from './home.types';

export default function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Loading>(Loading.None);

  const handleImageGeneration = async (prompts: string[], loadingType: Loading) => {
    try {
      setLoading(loadingType);
      const res = await api.post('/projects', {
        prompts,
      });
      const { projectId } = res.data;
      navigate(`${AppRoutes.Projects}/${projectId}`);
    } catch (error: any) {
      throw new Error(error.response.data.message);
    } finally {
      setLoading(Loading.None);
    }
  };

  const changeLoading = (loadingType: Loading) => {
    setLoading(loadingType);
  };

  return <HomeInput handleImageGeneration={handleImageGeneration} loading={loading} setLoading={changeLoading} />;
}
