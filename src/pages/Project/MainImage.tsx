import CustomImage from '@/components/ui/image';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeSelectedImage } from '@/providers/redux/project/projectSlice';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type Props = {
  setShowHeading: (value: boolean) => void;
};

const MainImage = ({ setShowHeading }: Props) => {
  const dispatch = useAppDispatch();
  const { images, selectedImage } = useAppSelector((state) => state.project);

  return (
    <div
      className="aspect-[16/9] rounded-lg overflow-hidden"
      onMouseEnter={() => setShowHeading(true)}
      onMouseLeave={() => setShowHeading(false)}
    >
      <CustomImage
        alt="Selected Image"
        className="object-cover aspect-[16/9] w-full h-full"
        src={images[selectedImage]?.url}
      />
      <button
        className={`${
          selectedImage === 0 ? 'text-gray-400' : 'text-white hover:text-gray-300'
        } absolute p-1 transition-colors -translate-y-1/2 rounded-full top-1/2 left-4 bg-[#121213]`}
        onClick={() => dispatch(changeSelectedImage(selectedImage === 0 ? selectedImage : selectedImage - 1))}
        disabled={selectedImage === 0}
      >
        <ChevronLeftIcon className="w-5 h-5" />
        <span className="sr-only">Previous</span>
      </button>
      <button
        className={`${
          selectedImage === images.length - 1 ? 'text-gray-400' : 'text-white hover:text-gray-300'
        } absolute p-1 transition-colors -translate-y-1/2 rounded-full top-1/2 right-4 bg-[#121213]`}
        disabled={selectedImage === images.length - 1}
        onClick={() =>
          dispatch(changeSelectedImage(selectedImage === images.length - 1 ? selectedImage : selectedImage + 1))
        }
      >
        <ChevronRightIcon className="w-5 h-5" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default MainImage;
