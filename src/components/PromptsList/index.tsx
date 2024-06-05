import Skeleton from 'react-loading-skeleton';

type Props = {
  selectPrompt: (prompt: string) => void;
  fetchingPrompts: boolean;
};

const prompts = [
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita soluta dolorem facere necessitatibus aspernatur ex assumenda perspiciatis possimus deleniti, magnam consectetur, hic in repudiandae quia ea, beatae ipsam illo laborum omnis animi debitis. Sunt?',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita soluta dolorem facere necessitatibus aspernatur ex assumenda perspiciatis possimus deleniti, magnam consectetur, hic in repudiandae quia ea, beatae ipsam illo laborum omnis animi debitis. Sunt?',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita soluta dolorem facere necessitatibus aspernatur ex assumenda perspiciatis possimus deleniti, magnam consectetur, hic in repudiandae quia ea, beatae ipsam illo laborum omnis animi debitis. Sunt?',
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita soluta dolorem facere necessitatibus aspernatur ex assumenda perspiciatis possimus deleniti, magnam consectetur, hic in repudiandae quia ea, beatae ipsam illo laborum omnis animi debitis. Sunt?',
];
``;
const PromptsList = ({ selectPrompt, fetchingPrompts }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {prompts.map((prompt) => (
        <div
          onClick={() => selectPrompt(prompt)}
          className="bg-[#313338] cursor-pointer rounded-lg p-2 border-4 border-transparent hover:border-[#7D4AEA] transition-colors duration-300"
        >
          {fetchingPrompts ? (
            <Skeleton
              baseColor="#464646"
              highlightColor="#737374"
              height={'13px'}
              count={4}
            />
          ) : (
            <p className="text-[#B1B1B3] text-[13px] line-clamp-4">{prompt}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default PromptsList;
