interface UserIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

const UserIcon = ({ size = 18, ...props }: UserIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M12 10.8a3.6 3.6 0 1 0 0-7.2 3.6 3.6 0 0 0 0 7.2M3.6 21.6a8.4 8.4 0 1 1 16.8 0z"
    />
  </svg>
);

export default UserIcon;
