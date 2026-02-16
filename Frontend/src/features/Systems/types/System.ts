export interface SystemProps {
    acronym: string;
    icon: string;
    color: string;
    name: string;
    description: string;
    url: string;
    type: "page" | "file"
    file: File | null
}