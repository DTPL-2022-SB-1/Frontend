const menuData = [
  {
    id: 1,
    title: "Beranda",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Layanan",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Buat Janji",
        path: "/choose-schedule",
        newTab: false,
      },
    ],
  },
];
export default menuData;
