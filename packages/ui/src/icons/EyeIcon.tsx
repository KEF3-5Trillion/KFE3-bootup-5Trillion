interface EyeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const EyeIcon = ({ size = 18, ...props }: EyeIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.5 7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1.049 7a8.337 8.337 0 0 1 15.903 0A8.337 8.337 0 0 1 1.05 7Z"
    />
  </svg>
);
export default EyeIcon;
