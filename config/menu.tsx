import { MenuDataItem } from "@ant-design/pro-layout";
import ACCESS_ENUM from "@/access/accessEnum";

export const menus = [
  {
    path: "/",
    name: "Main",
  },

  {
    path: "/questions",
    name: "Questions",
  },
  {
    path: "/banks",
    name: "Question Categories",
  },
  {
    path: "/admin",
    name: "Admin",
    access: ACCESS_ENUM.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "user management",
        access: ACCESS_ENUM.ADMIN
      },
      {
        path: "/admin/bank",
        name: "bank management",
        access: ACCESS_ENUM.ADMIN
      },
      {
        path: "/admin/question",
        name: "question management",
        access: ACCESS_ENUM.ADMIN
      },
    ],
  },
  // {
  //     path: "https://localhost:3000",
  //     name: "Panda Man Interview Platform",
  //     target:"_blank"
  // },
] as MenuDataItem[];


// 根据路径查找所有菜单
export const findAllMenuItemByPath = (path: string): MenuDataItem | null => {
  return findMenuItemByPath(menus, path);
};

// 根据路径查找菜单
export const findMenuItemByPath = (
    menus: MenuDataItem[],
    path: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    if (menu.path === path) {
      return menu;
    }
    if (menu.children) {
      const matchedMenuItem = findMenuItemByPath(menu.children, path);
      if (matchedMenuItem) {
        return matchedMenuItem;
      }
    }
  }
  return null;
};

