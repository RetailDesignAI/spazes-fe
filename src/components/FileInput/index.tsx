import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import UploadIcon from '../ui/uploadicon';
import { X } from 'lucide-react';

type Props = {
  handleFileChange: (file: File | null) => void;
};

const FileInput = ({ handleFileChange }: Props) => {
  const [image, setImage] = useState<string>('');
  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      const file = new FileReader();
      file.onload = function () {
        handleFileChange(acceptedFiles[0]);
        setImage(file.result as string);
      };
      file.readAsDataURL(acceptedFiles[0]);
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const removeImage = () => {
    handleFileChange(null);
    setImage('');
  };

  return (
    <>
      {image ? (
        <div className="flex p-5 space-x-4 text-white border-2 border-gray-700 border-dashed rounded-lg itms-center justify-startr">
          <div className="relative">
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 p-1 bg-[#7D4AEA] rounded-full"
            >
              <X className="w-3 h-3" />
            </button>
            <img
              className="object-cover w-[80px] h-[80px]"
              src={image}
              alt="Uploaded Image"
            />
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-center space-x-4 text-white border-2 border-gray-700 border-dashed rounded-lg cursor-pointer p-11"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <>
              <UploadIcon className="w-8 h-8" />
              <span className="text-lg">Drop the file here</span>
            </>
          ) : (
            <>
              <UploadIcon className="w-8 h-8" />
              <span className="text-lg">Drag and drop or upload an image</span>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default FileInput;
