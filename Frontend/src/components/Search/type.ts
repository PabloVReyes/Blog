export interface SearchProps {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    debounce?: number;
    minWidth?: string | number;
    rightSection?: React.ReactNode;
}