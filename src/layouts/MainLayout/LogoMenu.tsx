import MenuIcon from "@mui/icons-material/Menu";
import { useState, MouseEvent } from "react";
import {
  Typography,
  SvgIcon,
  createSvgIcon,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const menuOptions = [
  {
    text: "Babylonjs",
    route: "/babylon",
    icon: createSvgIcon(
      <svg
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
      >
        <path
          d="M511.975145 0l133.533338 77.081483-443.431345 256v357.830821l309.898007 178.918517 309.941503-178.918517V333.081483l-138.802592-80.132431 133.489842-77.081482 138.802592 80.13243v511.993786l-443.431345 256-443.381635-256V256.006214L511.975145 0z m0 672.264861l-138.752882-80.138644V431.86757l138.752882-80.132431 138.802592 80.132431v160.258647L511.975145 672.264861z"
          p-id="7058"
        ></path>
      </svg>,
      "Babylonjs"
    ),
  },
  {
    text: "WebGPU",
    route: "/webgpu",
    icon: createSvgIcon(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="768"
        height="768"
        viewBox="0 0 768 768"
      >
        <path d="M265.5,504L24.745,87h481.51Z" />
        <path d="M506.5,87L386,295H627Z" />
        <path d="M506.5,503L386,295H627Z" />
        <path d="M626.5,296L566,192H687Z" />
        <path d="M626.5,88L566,192H687Z" />
        <path d="M168.627,547.469l-25.7,98.943-26.877-98.943H98.913L70.692,646.748,45.158,547.469H28.864L61.621,664.722l16.966-.168,28.221-94.239,27.214,94.239h17.134l33.933-117.085H168.627ZM285.879,615a46.371,46.371,0,0,0-5.459-22.594A39.572,39.572,0,0,0,264.881,576.7a46.213,46.213,0,0,0-23.181-5.711,47.756,47.756,0,0,0-23.77,5.8,40.093,40.093,0,0,0-16.043,16.547q-5.712,10.752-5.711,25.029t5.879,25.114a41.6,41.6,0,0,0,16.211,16.714,46.506,46.506,0,0,0,23.434,5.88q16.461,0,27.549-8.315a39.581,39.581,0,0,0,14.783-21.586H267.569a24.459,24.459,0,0,1-9.323,12.347q-6.637,4.621-16.546,4.619a29.643,29.643,0,0,1-20.579-7.643q-8.484-7.643-9.323-21.25h73.578a90.2,90.2,0,0,0,.5-9.239h0Zm-15.79-3.192H211.966q1.174-13.1,9.323-20.494a28.334,28.334,0,0,1,19.739-7.391,32.747,32.747,0,0,1,14.7,3.275,25.141,25.141,0,0,1,10.5,9.575,28.211,28.211,0,0,1,3.864,15.035h0Zm51.234-22.174V540.246H306.037V664.554h15.286V647.588a35.4,35.4,0,0,0,13.523,13.27,40.944,40.944,0,0,0,20.914,5.208,41.878,41.878,0,0,0,37.965-23.014,52.85,52.85,0,0,0,5.711-24.862q0-14.111-5.711-24.777A41.656,41.656,0,0,0,378.1,576.866a42.963,42.963,0,0,0-22.342-5.879,40.769,40.769,0,0,0-20.662,5.207,36.153,36.153,0,0,0-13.775,13.439h0Zm62.491,28.557a38.312,38.312,0,0,1-4.2,18.395,29.538,29.538,0,0,1-11.339,11.927,30.881,30.881,0,0,1-15.707,4.115,30.554,30.554,0,0,1-15.538-4.115,30.081,30.081,0,0,1-11.423-11.927,40.557,40.557,0,0,1,0-36.285,30.1,30.1,0,0,1,11.423-11.927,30.574,30.574,0,0,1,15.538-4.115,31.392,31.392,0,0,1,15.707,4.031,29.1,29.1,0,0,1,11.339,11.759,37.449,37.449,0,0,1,4.2,18.142h0ZM526.6,581.4a52.873,52.873,0,0,0-20.914-26.038q-14.363-9.236-33.008-9.239a59.1,59.1,0,0,0-29.734,7.643,55.966,55.966,0,0,0-21.25,21.334,64.565,64.565,0,0,0,0,61.567,56.107,56.107,0,0,0,21.25,21.25,59.068,59.068,0,0,0,29.734,7.643,56.956,56.956,0,0,0,28.053-6.971,56.039,56.039,0,0,0,20.326-18.983,58.146,58.146,0,0,0,9.071-26.457V601.392H467.133v12.431h46.7Q511.982,631.3,500.9,641.54t-28.221,10.247a43.637,43.637,0,0,1-22.091-5.627,39.867,39.867,0,0,1-15.454-16.043q-5.629-10.413-5.627-24.189t5.627-24.274a39.775,39.775,0,0,1,15.454-16.127,43.657,43.657,0,0,1,22.091-5.627,40.519,40.519,0,0,1,21.5,5.627A36.439,36.439,0,0,1,508.289,581.4H526.6Zm101.967,0.336q0-15.119-10.331-24.694t-30.153-9.575h-37.8V664.554h15.287V615.671h22.51q20.493,0,30.489-9.659t10-24.274h0Zm-40.484,21.334h-22.51v-43h22.51q24.858,0,24.861,21.67,0,10.248-6.047,15.79t-18.814,5.544h0Zm59.129-55.6v73.913q0,14.615,5.8,24.61a36.383,36.383,0,0,0,15.79,14.866,54.05,54.05,0,0,0,44.852,0,36.913,36.913,0,0,0,15.875-14.866Q735.4,636,735.4,621.382V547.469H720.117V621.55q0,15.623-7.644,23.182t-21.082,7.559q-13.606,0-21.25-7.559T662.5,621.55V547.469H647.211Z" />
      </svg>,
      "WebGPU"
    ),
  },
] as const;

// 获取menuOptions的类型
export type MenuOption = (typeof menuOptions)[number];

export default function LogoMenu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const defaultOption =
    menuOptions.find((option) => pathname.includes(option.route)) ??
    menuOptions[0];

  const [selectMenuOption, setSelectMenuOption] =
    useState<MenuOption>(defaultOption);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onMenuItemClick = (option: MenuOption) => {
    setSelectMenuOption(option);
    navigate(option.route);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goHome = () => {
    if (pathname === selectMenuOption.route) return;
    navigate(selectMenuOption.route);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {menuOptions.map((option) => (
          <MenuItem
            key={option.text}
            onClick={() => onMenuItemClick(option)}
            selected={selectMenuOption.text === option.text}
          >
            <SvgIcon fontSize="small" component={option.icon}></SvgIcon>
            <Typography ml={2}>{option.text}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <Box display="flex" ml={2} alignItems="center" sx={{ cursor: "pointer" }}>
        <SvgIcon component={selectMenuOption.icon}></SvgIcon>

        <Typography variant="h6" ml={1} onClick={goHome}>
          {selectMenuOption.text} Examples
        </Typography>
      </Box>
    </>
  );
}
