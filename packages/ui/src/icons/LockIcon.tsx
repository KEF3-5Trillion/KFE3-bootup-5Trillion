interface LockIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const LockIcon = ({ size = 18, ...props }: LockIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" {...props}>
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M2 7V5a5 5 0 0 1 10 0v2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm8-2v2H4V5a3 3 0 0 1 6 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export default LockIcon;
