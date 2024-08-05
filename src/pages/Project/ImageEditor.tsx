import CircleShape from '@/components/ImageEditor/Circle';
import LineShape from '@/components/ImageEditor/Line';
import Rectangle from '@/components/ImageEditor/Rectangle';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { EditorShapes, removeShape, setLines, setShapes } from '@/providers/redux/project/imageEditorSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';

type ImageEditorProps = {
  url: string;
  className: string;
  width: number;
  height: number;
};

// function downloadURI(uri: string, name: string) {
//   const link = document.createElement('a');
//   link.download = name;
//   link.href = uri;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// }

const ImageEditor = ({ url, width, height, className }: ImageEditorProps) => {
  const [image] = useImage(url, 'anonymous');
  const dispatch = useAppDispatch();
  const [selectedId, selectShape] = useState('');
  const stageRef = useRef<any>(null);
  const isDrawing = useRef<boolean>(false);
  const { rectangles, circles, lines, isEditModeOn } = useAppSelector((state) => state.imageEditor);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Backspace' || event.key === 'Delete') {
        dispatch(removeShape(selectedId));
      }
    },
    [dispatch, selectedId]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const checkDeselect = (e: any) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    handleMouseDown(e);
    if (clickedOnEmpty) {
      selectShape('');
    }
  };

  const handleMouseDown = (e: any) => {
    if (isEditModeOn) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      dispatch(setLines([...lines, { tool: 'pen', points: [pos.x, pos.y] }]));
    }
  };

  const handleMouseMove = (e: any) => {
    // no drawing - skipping
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines[lines.length - 1];

    if (lastLine) {
      // Create a new line object with updated points
      const updatedLine = {
        ...lastLine,
        points: [...lastLine.points, point.x, point.y],
      };

      // Create a new lines array with the updated line
      const updatedLines = [...lines.slice(0, lines.length - 1), updatedLine];

      // Dispatch the new lines array to Redux
      dispatch(setLines(updatedLines));
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  //   const handleExport = async () => {
  //     const uri = stageRef.current.toDataURL();
  //     console.log(uri);
  //     // we also can save uri as file
  //     // but in the demo on Konva website it will not work
  //     // because of iframe restrictions
  //     // but feel free to use it in your apps:
  //     downloadURI(uri, 'stage.png');
  //   };

  return (
    <>
      {/* <button onClick={handleExport}>Download</button> */}
      <Stage
        ref={stageRef}
        className={`${className} ${isEditModeOn && 'cursor-crosshair'}`}
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Layer>
          <Image width={width} height={height} image={image} />
          {rectangles?.map((rect, i) => {
            return (
              <Rectangle
                key={rect?.id}
                shapeProps={rect}
                isSelected={rect?.id === selectedId}
                onSelect={() => {
                  selectShape(rect?.id as string);
                }}
                onChange={(newAttrs) => {
                  const rects = rectangles.slice();
                  rects[i] = newAttrs;
                  dispatch(setShapes({ shape: EditorShapes.Rectangle, data: rects }));
                }}
              />
            );
          })}
          {circles?.map((circle, i) => {
            return (
              <CircleShape
                key={circle?.id}
                shapeProps={circle}
                isSelected={circle?.id === selectedId}
                onSelect={() => {
                  selectShape(circle?.id as string);
                }}
                onChange={(newAttrs) => {
                  const circs = circles.slice();
                  circs[i] = newAttrs;
                  dispatch(setShapes({ shape: EditorShapes.Circle, data: circs }));
                }}
              />
            );
          })}
          {lines?.map((line, i) => {
            return <LineShape key={i} shapeProps={line} />;
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default ImageEditor;
