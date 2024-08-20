import { IImage } from '@/pages/Project/project.types';
import { Document, Image, Page, StyleSheet } from '@react-pdf/renderer';

type Template3Props = {
  images: IImage[];
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#E4E4E4',
    color: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  image: {
    width: '300px',
    aspectRatio: '16/9',
  },
});

const Template3 = ({ images }: Template3Props) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {images.map((image) => (
          <Image style={styles.image} src={image.url} key={image._id} />
        ))}
      </Page>
    </Document>
  );
};

export default Template3;
