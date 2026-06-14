// components/CustomIcons.tsx
import { View } from 'react-native';
import Svg, { Path, Circle, Rect, Polyline, Line } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
    focused?: boolean;
}


export const PersonOutlineIcon = ({ size = 24, color = "#A261F4" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="8"
                r="4"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
            <Path
                d="M5 20V19C5 15.6863 7.68629 13 11 13H13C16.3137 13 19 15.6863 19 19V20"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
        </Svg>
    );
};



export const EditIcon = ({ size = 22, color = "#6B7280" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M17 3L21 7L7 21H3V17L17 3Z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M15 5L19 9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};

export const ChatBubbleIcon = ({ size = 24, color = "#A261F4", focused = false }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke={color}
                strokeWidth={1.5}
                fill={focused ? color : "none"}
                strokeLinejoin="round"
            />
        </Svg>
    );
};


export const MailOutlineIcon = ({ size = 20, color = "#2563EB" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect
                x="2"
                y="4"
                width="20"
                height="16"
                rx="2"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
            <Path
                d="M22 7L12 13L2 7"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};


export const ChevronForwardIcon = ({ size = 20, color = "#9CA3AF" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Polyline
                points="9 18 15 12 9 6"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};


export const SettingsOutlineIcon = ({ size = 22, color = "#6B7280" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="12"
                cy="12"
                r="3"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
            <Path
                d="M19.4 15.05L18.4 16.95C18.1 17.45 17.5 17.7 16.9 17.5L15.2 16.95C14.8 17.25 14.4 17.5 13.9 17.7L13.6 19.5C13.5 20.1 13 20.5 12.4 20.5H11.6C11 20.5 10.5 20.1 10.4 19.5L10.1 17.7C9.6 17.5 9.2 17.25 8.8 16.95L7.1 17.5C6.5 17.7 5.9 17.45 5.6 16.95L4.6 15.05C4.3 14.55 4.45 13.9 4.95 13.6L6.5 12.65V11.35L4.95 10.4C4.45 10.1 4.3 9.45 4.6 8.95L5.6 7.05C5.9 6.55 6.5 6.3 7.1 6.5L8.8 7.05C9.2 6.75 9.6 6.5 10.1 6.3L10.4 4.5C10.5 3.9 11 3.5 11.6 3.5H12.4C13 3.5 13.5 3.9 13.6 4.5L13.9 6.3C14.4 6.5 14.8 6.75 15.2 7.05L16.9 6.5C17.5 6.3 18.1 6.55 18.4 7.05L19.4 8.95C19.7 9.45 19.55 10.1 19.05 10.4L17.5 11.35V12.65L19.05 13.6C19.55 13.9 19.7 14.55 19.4 15.05Z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};


export const LogoutOutlineIcon = ({ size = 20, color = "white" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M16 17L21 12L16 7"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M21 12H9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};


export const LockOutlineIcon = ({ size = 20, color = "#6B7280" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Rect
                x="5"
                y="11"
                width="14"
                height="11"
                rx="2"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
            <Path
                d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
            <Circle
                cx="12"
                cy="16"
                r="1.5"
                fill={color}
            />
        </Svg>
    );
};


export const EyeOutlineIcon = ({ size = 20, color = "#6B7280" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
            <Circle
                cx="12"
                cy="12"
                r="3"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
        </Svg>
    );
};


export const EyeOffOutlineIcon = ({ size = 20, color = "#6B7280" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M9.9 4.24C10.6 4.08 11.3 4 12 4C19 4 23 12 23 12C22.5 13.1 21.8 14.1 21 15"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
            <Path
                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
            <Path
                d="M3 3L21 21"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
            <Path
                d="M5.5 5.5C3.9 6.8 2.5 8.9 1 12C1 12 5 20 12 20C13.5 20 14.9 19.6 16.1 18.9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
        </Svg>
    );
};



export const AddOutlineIcon = ({ size = 20, color = "#0D0D0F" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M12 5V19"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
            <Path
                d="M5 12H19"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
        </Svg>
    );
};


export const SearchOutlineIcon = ({ size = 20, color = "#9CA3AF" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Circle
                cx="11"
                cy="11"
                r="8"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
            <Path
                d="M21 21L17 17"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                fill="none"
            />
        </Svg>
    );
};


export const SendOutlineIcon = ({ size = 20, color = "white" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M22 2L11 13"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};


export const CheckmarkIcon = ({ size = 20, color = "#10B981" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M20 6L9 17L4 12"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};


export const DeleteOutlineIcon = ({ size = 20, color = "#EF4444" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M3 6H5H21"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};

export const CameraOutlineIcon = ({ size = 20, color = "white" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Circle
                cx="12"
                cy="14"
                r="4"
                stroke={color}
                strokeWidth={1.5}
                fill="none"
            />
        </Svg>
    );
};



export const CreateOutlineIcon = ({ size = 20, color = "#0D0D0F" }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M17 3L21 7L7 21H3V17L17 3Z"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <Path
                d="M15 5L19 9"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};

export const FilledCircleXIcon = ({ size = 24, color = "#ef4444" }: IconProps) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="10" fill={color} />
        <Path
            d="M15 9L9 15M9 9L15 15"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
        />
    </Svg>
);



export const SendIcon = ({ size = 18, color = "#FFFFFF" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M22 2L11 13"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke={color}
                strokeWidth={2}
                strokeLinejoin="round"
                fill="none"
            />
        </Svg>
    );
};

export const BackIcon = ({ size = 24, color = "#2563EB" }: IconProps) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M19 12H5"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
            />
            <Path
                d="M12 19L5 12L12 5"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};