import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const NewGenerationModal = () => {
  return (
    <DialogContent className="bg-[#121213]">
      <DialogHeader>
        <DialogTitle className="mb-8 text-white">
          Generate new image in
        </DialogTitle>
        <div className="flex justify-between w-full">
          <button className="p-4 rounded-lg w-[45%] text-white bg-gradient-to-r shadow-lg from-[#7D4AEA] to-[#9B59B6] shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50 font-semibold">
            Same Project
          </button>
          <button className="rounded-lg w-[45%] text-white bg-gradient-to-r shadow-lg from-[#7D4AEA] to-[#9B59B6] shadow-[#7D4AEA]/50 hover:shadow-[#9B59B6]/50 font-semibold">
            New Project
          </button>
        </div>
      </DialogHeader>
    </DialogContent>
  );
};

export default NewGenerationModal;
