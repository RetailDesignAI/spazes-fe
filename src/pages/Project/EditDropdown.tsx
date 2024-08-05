import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownProps, DropdownValues, buttons } from './project.types';
import { changeDropdownValue } from '@/providers/redux/project/projectSlice';
import { useAppDispatch } from '@/hooks/useRedux';

const EditDropdown = ({ value }: DropdownProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {buttons.find((button) => button.value === value)?.label}
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
                    dispatch(changeDropdownValue(currentValue as DropdownValues));
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4 text-purple', value === button.value ? 'opacity-100' : 'opacity-0')} />
                  {button.label}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default EditDropdown;
