export interface InputProps {
  type: string;
  name: string;
  id: string;
  min?: string;
  placeholder?: string;
  value?: string | number;
  "data-cy"?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
