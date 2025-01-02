import icons from './icons';

const { MdOutlineLibraryMusic, FaChartLine, TbChartArcs, MdOutlineFeed } = icons;

export const sidebarMenu = [
    { path: '/', text: 'Khám phá', icon: <TbChartArcs size={24} /> },
    { path: '/my-music', text: 'Cá nhân', icon: <MdOutlineLibraryMusic size={24} /> },
    { path: '/zing-chart', text: '#zingchart', icon: <FaChartLine size={24} /> },
    { path: '/follow', text: 'Theo dõi', icon: <MdOutlineFeed size={24} /> },
];

export const searchMenu = [
    { path: 'tat-ca', text: 'TẤT CẢ' },
    { path: 'bai-hat', text: 'BÀI HÁT' },
    { path: 'playlist', text: 'PLAYLIST/ALBUM' },
]; 