export type Topic = {
  id: string;
  category: string;
  title: string;
  keywords: string[];
};

export type IconProps = {
  size?: number;
  className?: string;
  color?: string;
  onClick?: () => void;
}
