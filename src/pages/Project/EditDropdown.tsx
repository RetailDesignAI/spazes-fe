import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownValues, buttons } from './project.types';
import { changeDropdownValue } from '@/providers/redux/project/projectSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { resetImageEditorState } from '@/providers/redux/project/imageEditorSlice';
import { fadeAnimation } from '@/lib/animations';
import { motion } from 'framer-motion';

const EditDropdown = () => {
  const dispatch = useAppDispatch();
  const { dropdownValue } = useAppSelector((state) => state.project);
  const [open, setOpen] = useState(false);

  return (
    <motion.div {...fadeAnimation}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button role="combobox" aria-expanded={open} className="w-full justify-between bg-[#313338] hover:bg-primary/90">
            {buttons.find((button) => button.value === dropdownValue)?.label}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 dark">
          <Command>
            <CommandGroup>
              <CommandList>
                {buttons.map((button) => (
                  <CommandItem
                    key={button.value}
                    value={button.value}
                    onSelect={(currentValue: string) => {
                      dispatch(resetImageEditorState());
                      dispatch(changeDropdownValue(currentValue as DropdownValues));
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4 text-purple',
                        dropdownValue === button.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    {button.label}
                  </CommandItem>
                ))}
              </CommandList>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default EditDropdown;
