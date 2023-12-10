import { useRouter } from "next/navigation";
import Icon from "./Icon";
import { IconButtonProps, IconButton as MuiIconButton, Tooltip } from "@mui/material";
import Link from "next/link";

export interface IIconButtonProps extends IconButtonProps {
    name: string;
    size?: 'small';
    bgColor?: boolean;
    tooltip?: string;
    href?: string;
}

export default function IconButton({
    name,
    size,
    bgColor = false,
    tooltip,
    href,
    ...props
}: IIconButtonProps) {
    let button = (
        <MuiIconButton
            className={"rounded-md " + (bgColor ? "bg-apple-gray-6 " : "")}
            size={size ?? "small"}
            {...props}
        >
            <Icon
                className="w-8 h-8 grid place-items-center"
                name={name ?? ""}
            />
        </MuiIconButton>
    );

    if (tooltip) {
        button = (
            <Tooltip title={tooltip}>
                {button}
            </Tooltip>
        );
    }
    
    if (href) {
        button = (
            <Link href={href}>
                {button}
            </Link>
        )
    }

    return button;
}