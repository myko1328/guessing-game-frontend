export interface CardProps {
  totalWinnings: number;
  registeredName: { name: string; isRegisted: boolean };
}

export interface CardItem {
  id?: number;
  title: React.ReactNode;
  icon: JSX.Element;
}
