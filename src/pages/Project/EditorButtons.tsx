import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { DropdownValues } from './project.types';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { AnimatePresence, motion } from 'framer-motion';
import { Circle, Pen, RectangleHorizontal } from 'lucide-react';
import { addShape, EditorShapes, toggleEditMode } from '@/providers/redux/project/imageEditorSlice';

const editorButtonsAnimation = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 5,
  },
  exit: {
    opacity: 0,
    y: -50,
  },
  transition: {
    type: 'just',
    duration: 0.25,
  },
};

const EditorButtons = () => {
  const dispatch = useAppDispatch();
  const { dropdownValue } = useAppSelector((state) => state.project);
  const { isEditModeOn } = useAppSelector((state) => state.imageEditor);

  return (
    <>
      {dropdownValue === DropdownValues.Image && (
        <AnimatePresence>
          <motion.div className="w-full relative flex gap-3" {...editorButtonsAnimation}>
            <Button
              className="hover:text-muted-foreground hover:bg-muted"
              onClick={() => dispatch(addShape(EditorShapes.Rectangle))}
            >
              <RectangleHorizontal className="w-5 h-5" />
            </Button>
            <Button
              className="hover:text-muted-foreground hover:bg-muted"
              onClick={() => dispatch(addShape(EditorShapes.Circle))}
            >
              <Circle className="w-4 h-4" />
            </Button>
            <Toggle
              onClick={() => dispatch(toggleEditMode(!isEditModeOn))}
              className={`bg-custom-secondary ${
                isEditModeOn &&
                'data-[state=on]:bg-gradient-to-r data-[state=on]:from-[#7D4AEA] data-[state=on]:to-[#9B59B6]'
              }`}
            >
              <Pen className="w-4 h-4" />
            </Toggle>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

export default EditorButtons;
