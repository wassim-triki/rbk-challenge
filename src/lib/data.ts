import { PiGithubLogoFill } from "react-icons/pi";
import { AiFillYoutube, AiFillLinkedin } from "react-icons/ai";
const socialLinks = [
  {
    platform: "Github",
    icon: PiGithubLogoFill,
  },
  {
    platform: "Youtube",
    icon: AiFillYoutube,
  },
  {
    platform: "LinkedIn",
    icon: AiFillLinkedin,
  },
  //   {
  //     name: "Facebook",
  //     icon: PiGithubLogoFill,
  //   },
] as const;

export { socialLinks };
