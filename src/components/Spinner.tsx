import { ImSpinner } from "react-icons/im";

interface SpinnerProps {
    color?: string;
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "green", size = 8 }) => {
    return (
        <ImSpinner className={` text-${color}-500 fill-${color}-500 w-${size} h-${size} animate-[spin_2s_linear_infinite]`  } />
    );
};

export default Spinner;