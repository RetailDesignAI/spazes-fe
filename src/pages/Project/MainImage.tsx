import CustomImage from '@/components/ui/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

type Props = {
  images: { prompt: string; url: string }[];
  selectedImage: number;
  handleNext: () => void;
  handlePrevious: () => void;
  setShowHeading: (value: boolean) => void;
};

const MainImage = ({ images, selectedImage, handleNext, handlePrevious, setShowHeading }: Props) => {
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
        onClick={handlePrevious}
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
        onClick={handleNext}
      >
        <ChevronRightIcon className="w-5 h-5" />
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default MainImage;
