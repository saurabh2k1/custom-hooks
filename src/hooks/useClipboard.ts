import { useState, useEffect } from "react";

const useClipboard = () => {
    const [copied, setCopied] = useState(false);
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error('Failed to write text to clipboard: ', error);
        }
    };
    return {
        copied,
        copyToClipboard,
    };
};

export default useClipboard;

// Usage
// ----------------------------------------------------------------
// import React from 'react';
// import useClipboard from './useClipboard';

// const MyComponent: React.FC = () => {
//   const { copied, copyToClipboard } = useClipboard();

//   const textToCopy = 'This is some text to copy';

//   return (
//     <div>
//       <button onClick={() => copyToClipboard(textToCopy)}>
//         Copy to Clipboard
//       </button>
//       {copied && <span>Copied!</span>}
//     </div>
//   );
// };

// export default MyComponent;
// ----------------------------------------------------------------