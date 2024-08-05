import { Line } from 'react-konva';

const LineShape = ({ shapeProps }: { shapeProps: any }) => {
  return (
    <Line
      {...shapeProps}
      stroke="#fff"
      fill="white"
      strokeWidth={1}
      tension={0.5}
      closed={true}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={'source-over'}
    />
  );
};

export default LineShape;
