import { Typography, SvgIcon, createSvgIcon, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LogoIcon = createSvgIcon(
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
);

export default function LogoMenu() {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  return (
    <>
      <Box display="flex" ml={2} alignItems="center" sx={{ cursor: "pointer" }}>
        <SvgIcon component={LogoIcon}></SvgIcon>

        <Typography variant="h6" ml={1} onClick={goHome}>
          BabylonJs Examples
        </Typography>
      </Box>
    </>
  );
}
