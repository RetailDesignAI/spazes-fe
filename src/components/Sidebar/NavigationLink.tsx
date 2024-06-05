import { NavLink } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  name: string;
  to: string;
  className?: string;
}

const NavigationLink = ({ children, name, to, className }: Props) => {
  return (
    <NavLink
      to={to}
      className={`flex gap-3 py-2 px-[13px] transition-colors duration-200 rounded-lg cursor-pointer hover:stroke-neutral-100 stroke-custom-gray text-custom-gray hover:text-neutral-100 place-items-center ${className}`}
    >
      {children}
      <p className="text-sm tracking-wide text-inherit font-poppins overflow-clip whitespace-nowrap">
        {name}
      </p>
    </NavLink>
  );
};

export default NavigationLink;
