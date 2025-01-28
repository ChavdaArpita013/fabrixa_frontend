import React from 'react';
import { useDrag } from 'react-dnd';
import { MdTextFields, MdImage, MdBorderHorizontal } from 'react-icons/md';

const SidebarItem = ({ type, label, Icon }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'sidebar-item',
        item: { type },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`flex items-center p-4 mb-2 border rounded-lg cursor-pointer transition-transform duration-200 ${
                isDragging ? 'bg-blue-50 border-blue-500 shadow-lg' : 'bg-white border-gray-300'
            } hover:scale-105 hover:shadow-md`}
        >
            <Icon className="mr-3 text-blue-500 text-2xl" />
            <span className="text-gray-700 font-medium">{label}</span>
        </div>
    );
};

const Sidebar = () => {
    return (
        <div className="w-56 h-full bg-gradient-to-b from-blue-50 to-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Tools</h2>
            <SidebarItem type="text" label="Add Text" Icon={MdTextFields} />
            <SidebarItem type="image" label="Add Image" Icon={MdImage} />
            <SidebarItem type="line-horizontal" label="Horizontal Line" Icon={MdBorderHorizontal} />
            <SidebarItem type="line-vertical" label="Vertical Line" Icon={MdBorderHorizontal} />
        </div>
    );
};

export default Sidebar;
