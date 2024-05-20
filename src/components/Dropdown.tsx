import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
    value: any;
    label: string;
}

interface DropdownProps {
    options: DropdownOption[];
    selectedValue?: any;
    onChange: (value: any) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selectedValue,
    onChange,
    placeholder = 'Select an option',
    className,
    disabled,
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (dropdownRef.current &&!dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (value: any) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className={`dropdown ${className? className : ''}`} ref={dropdownRef}>
            <button type='button' className="dropdown-toggle" onClick={toggleDropdown} disabled={disabled}>
                {selectedValue? options.find((option) => option.value === selectedValue)?.label : placeholder}
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <div key={option.value} className="dropdown-item" onClick={() => handleOptionClick(option.value)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

};

export default Dropdown;


