import './ui-components.css';

type Props = {
  openSidebar: () => void;
};

const Hamburger = ({ openSidebar }: Props) => {
  return (
    <div onClick={openSidebar} className="hidden hamburger max-sm:block">
      <div>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Hamburger;
