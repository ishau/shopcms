import React from 'react';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';
import FolderSharedOutlinedIcon from '@material-ui/icons/FolderSharedOutlined';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import ListAltIcon from '@material-ui/icons/ListAlt';

const menuList = [
    {
        id: "",
        children: [
            { id: "Dashboard", icon: <DashboardOutlinedIcon />, path: "/dashboard" },
        ]
    },
    {
        id :"Products",
        children: [
            { id: "New Product", icon: <AddOutlinedIcon />, path: "/newproduct" },
            { id: "Product List", icon: <DnsOutlinedIcon />, path: "/productlist"},
        ]
    },
    
    {
        id :"Config",
        children: [
            { id: "System", icon: <PermDataSettingIcon />, path: "/system" },
            { id: "users", icon: <PersonIcon />, path: "/users" },
        ]
    },
    
];

export default menuList;