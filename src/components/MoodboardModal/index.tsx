'use client';

import { useState } from 'react';
import api from '@/api/axiosConfig';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useAppSelector } from '@/hooks/useRedux';
import { CheckIcon } from '../ui/checkIcon';
import { IImage } from '@/pages/Project/project.types';
import { useToast } from '../ui/use-toast';
import Template3 from './MoodboardTemplates/Template-3';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Template4 from './MoodboardTemplates/Template-4';
import Template6 from './MoodboardTemplates/Template-6';
import Template5 from './MoodboardTemplates/Template-5';

export default function MoodboardModal() {
  const { toast } = useToast();
  const { images } = useAppSelector((state) => state.project);
  const [selectedImages, setSelectedImages] = useState<IImage[]>([]);

  const handleImageClick = (image: IImage) => {
    const isPresent = selectedImages.find((imageObj) => imageObj._id === image._id);
    if (isPresent) {
      setSelectedImages(selectedImages.filter((imageObj) => imageObj._id !== image._id));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleMoodboardGeneration = async () => {
    if (selectedImages.length < 3 || selectedImages.length > 6) {
      return;
    }
    try {
      await api.post('/images/moodboard', {
        images: selectedImages.map((image) => image._id),
      });
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: error.response.data.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'outline'} className="w-full mt-5">
            Get Moodboard
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px] bg-[#121213] dark">
          <DialogHeader>
            <DialogTitle>Get Moodboard</DialogTitle>
            <DialogDescription>
              Ready to capture the vibe? Pick at least 3 and up to 6 images to set the tone for your perfect moodboard!
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full">
            <div className="grid grid-cols-2 gap-4 py-4 md:grid-cols-3 lg:grid-cols-4">
              {images.map((image, i) => {
                const isPresent = selectedImages.find((imageObj) => imageObj._id === image._id);
                return (
                  <div
                    key={image._id}
                    className="relative cursor-pointer overflow-hidden rounded-lg border transition-all duration-200 hover:border-primary"
                    onClick={() => handleImageClick(image)}
                  >
                    <img
                      src={image.url}
                      width={600}
                      height={338}
                      alt={`Image ${i + 1}`}
                      className={`aspect-video w-full object-cover ${isPresent ? 'opacity-50' : 'opacity-100'}`}
                      style={{ aspectRatio: '600/338', objectFit: 'cover' }}
                    />
                    {isPresent && (
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/50 text-primary-foreground">
                        <CheckIcon className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div></div>
          </div>
          <div className="flex items-center justify-between border-t py-4 px-2">
            <div className="text-sm text-muted-foreground">
              {selectedImages.length} image{selectedImages.length !== 1 ? 's ' : ' '}
              selected
            </div>
            <PDFDownloadLink
              document={
                selectedImages.length === 3 ? (
                  <Template3 images={selectedImages} />
                ) : selectedImages.length === 4 ? (
                  <Template4 images={selectedImages} />
                ) : selectedImages.length === 5 ? (
                  <Template5 images={selectedImages} />
                ) : (
                  <Template6 images={selectedImages} />
                )
              }
              fileName="moodboard.pdf"
            >
              {({ loading }) => (
                <Button
                  disabled={selectedImages.length > 6 || selectedImages.length < 3}
                  variant={'gradient'}
                  onClick={handleMoodboardGeneration}
                  className="w-[200px]"
                >
                  {loading ? 'Generating Moodboard' : 'Download Moodboard'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
