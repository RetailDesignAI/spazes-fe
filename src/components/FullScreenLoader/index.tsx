import Spinner from '../ui/spinner';

const FullScreenLoader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center bg-custom-primary">
      <Spinner />
    </div>
  );
};

export default FullScreenLoader;
