import AccessEnum from "@/access/accessEnum";


// 默认用户
export const DEFAULT_USER: API.LoginUserVO = {
    userName: "Not Login",
    userProfile: "No Profile",
    userAvatar: "/assets/custom_coat.png",
    userRole: AccessEnum.NOT_LOGIN,
};
