import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type CustomImageProps = {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
};

const CustomImage = ({ src, alt, width, height, className }: CustomImageProps) => {
  return <LazyLoadImage src={src} alt={alt} width={width} height={height} className={className} effect="blur" />;
};

export default CustomImage;
