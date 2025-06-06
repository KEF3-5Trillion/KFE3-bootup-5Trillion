interface TestButtonProps {
  children: React.ReactNode;
}

const TestButton = ({children}: TestButtonProps) => {
  return <button className="bg-bg-primary font-style-headline-h4 p-7">{children}</button>;
};

export default TestButton;
