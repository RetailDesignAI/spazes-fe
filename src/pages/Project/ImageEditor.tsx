import { useCallback, useEffect, useRef } from 'react';
import useImage from 'use-image';
import { v4 as uuidv4 } from 'uuid';
import { Stage, Layer, Image, Line } from 'react-konva';
import CircleShape from '@/components/ImageEditor/Circle';
import Rectangle from '@/components/ImageEditor/Rectangle';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { EditorShapes, removeShape, selectShape, setLines, setShapes } from '@/providers/redux/project/imageEditorSlice';

type ImageEditorProps = {
  url: string;
  className: string;
  width: number;
  height: number;
};

const ImageEditor = ({ url, width, height, className }: ImageEditorProps) => {
  const [image] = useImage(url, 'anonymous');
  const dispatch = useAppDispatch();
  const stageRef = useRef<any>(null);
  const isDrawing = useRef<boolean>(false);
  const { rectangles, circles, lines, isEditModeOn, selectedId } = useAppSelector((state) => state.imageEditor);

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

  useEffect(() => {
    const handleOutsideClick = (e: any) => {
      const stage = stageRef.current?.getStage();
      const clickedOnStage = stage?.content?.contains(e.target as Node);

      if (!clickedOnStage) {
        dispatch(selectShape(''));
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dispatch]);

  const checkDeselect = (e: any) => {
    const elementClicked = e.target?.attrs;
    const isDraggable = elementClicked?.draggable;
    const elementClickedType = elementClicked?.id?.split('_')[0];

    if ((elementClickedType !== EditorShapes.Rectangle || elementClickedType !== EditorShapes.Circle) && !isDraggable) {
      dispatch(selectShape(''));
    }
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch(selectShape(''));
    }
    handleMouseDown(e);
  };

  const handleMouseDown = (e: any) => {
    if (isEditModeOn) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      dispatch(setLines([...lines, { id: uuidv4(), tool: 'pen', points: [pos.x, pos.y] }]));
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

  return (
    <>
      <Stage
        ref={stageRef}
        className={`${className} ${isEditModeOn && 'cursor-crosshair'}`}
        id="stage-image-editor"
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
                  dispatch(selectShape(rect?.id as string));
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
                  dispatch(selectShape(circle?.id as string));
                }}
                onChange={(newAttrs) => {
                  const circs = circles.slice();
                  circs[i] = newAttrs;
                  dispatch(setShapes({ shape: EditorShapes.Circle, data: circs }));
                }}
              />
            );
          })}
          {lines?.map((line) => {
            return (
              <Line
                key={line?.id}
                points={line.points}
                stroke={selectedId === line?.id ? '#000' : '#fff'}
                fill="white"
                strokeWidth={1}
                tension={1}
                closed={true}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={'source-over'}
              />
            );
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default ImageEditor;
