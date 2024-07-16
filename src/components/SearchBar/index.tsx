import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Filter } from 'lucide-react';
import { Filters } from '@/pages/Projects/projects.types';

type Props = {
  searchTerm: string;
  changeSearchTerm: (searchTerm: string) => void;
  sortBy: string;
  changeSortBy: (sortBy: string) => void;
  filters: Filters;
};

const SearchBar = ({ searchTerm, changeSearchTerm, sortBy, changeSortBy, filters }: Props) => {
  return (
    <div className="relative flex items-center w-full">
      <Input
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => changeSearchTerm(e.target.value)}
        className="w-full pl-2 pr-10 text-white duration-200 border-gray-700 outline-none bg-custom-secondary placeholder:text-gray-500 focus:ring-0 focus:outline-custom-gray"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute right-0 flex items-center gap-2 cursor-pointer w-[40px] h-full justify-center rounded-md">
            <Filter className="w-5 h-5 duration-150 hover:text-purple text-custom-gray" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="dark">
          <DropdownMenuRadioGroup defaultValue={sortBy} value={sortBy} onValueChange={changeSortBy}>
            {Object.keys(filters).map((key, index) => (
              <DropdownMenuRadioItem key={key} value={Object.values(filters)[index]}>
                {key}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchBar;
