type Props = {
  text: string;
};

const SectionSeparator = ({ text }: Props) => {
  return (
    <div className="relative w-full flex">
      <span className="border-t w-[30%]" />
      <div className="relative flex justify-center text-xs">
        <span className="bg-transparent px-2 text-muted-foreground">{text}</span>
      </div>
      <span className="border-t w-[30%] flex-1" />
    </div>
  );
};

export default SectionSeparator;
