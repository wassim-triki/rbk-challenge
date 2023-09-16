import { PiGithubLogoFill } from "react-icons/pi";
import {
  AiFillYoutube,
  AiFillLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Globe } from "lucide-react";
const socialLinks = [
  {
    platform: "LinkedIn",
    icon: AiFillLinkedin,
  },
  {
    platform: "Github",
    icon: PiGithubLogoFill,
  },
  {
    platform: "Website",
    icon: Globe,
  },
  {
    platform: "Twitter",
    icon: AiOutlineTwitter,
  },
  {
    platform: "Youtube",
    icon: AiFillYoutube,
  },
] as const;

const socialIcons = {
  github: PiGithubLogoFill,
  youtube: AiFillYoutube,
  linkedin: AiFillLinkedin,
  website: Globe,
  twitter: AiOutlineTwitter,
};

const linkPreviews: {
  [key: string]: { bg: string; icon: typeof PiGithubLogoFill };
} = {
  github: {
    bg: "#191919",
    icon: socialIcons.github,
  },
  youtube: {
    bg: "#EF383A",
    icon: socialIcons.youtube,
  },
  linkedin: {
    bg: "#2D69FF",
    icon: socialIcons.linkedin,
  },
  website: {
    bg: "#FFC107",
    icon: socialIcons.website,
  },
  twitter: {
    bg: "#1DA1F2",
    icon: socialIcons.twitter,
  },
};

export { socialLinks, socialIcons, linkPreviews };
