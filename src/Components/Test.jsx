import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { MdAddCircleOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Rnd } from "react-rnd";

const Page = () => {
    const [pages, setPages] = useState([{ id: 1, items: [], height: 890, width: 1150 }]);
    const [activePage, setActivePage] = useState(1); // Track the active page
    const pageRefs = useRef({}); // To store references for each page

    const handleResize = (pageId, itemId, newSize, position) => {
        setPages((prevPages) =>
            prevPages.map((page) =>
                page.id === pageId
                    ? {
                        ...page,
                        items: page.items.map((item) =>
                            item.id === itemId ? { ...item, ...newSize, ...position } : item
                        ),
                    }
                    : page
            )
        );
    };

    const handleAddPage = () => {
        const newPage = { id: pages.length + 1, items: [], height: 890, width: 1150 };
        setPages([...pages, newPage]);
    };

    const handleDeletePage = (id) => {
        if (pages.length > 1) {
            setPages(pages.filter((page) => page.id !== id));
            if (activePage === id) setActivePage(pages[0].id); // Set a new active page if the active page is deleted
        } else {
            alert("At least one page is required.");
        }
    };

    const handleDeleteItem = (pageId, itemId) => {
        setPages((prevPages) =>
            prevPages.map((page) =>
                page.id === pageId
                    ? {
                        ...page,
                        items: page.items.filter((item) => item.id !== itemId),
                    }
                    : page
            )
        );
    };

    const handleUploadImage = (pageId, itemId, file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const imageSrc = reader.result;
            setPages((prevPages) =>
                prevPages.map((page) =>
                    page.id === pageId
                        ? {
                            ...page,
                            items: page.items.map((item) =>
                                item.id === itemId ? { ...item, src: imageSrc } : item
                            ),
                        }
                        : page
                )
            );
        };
        reader.readAsDataURL(file);
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "sidebar-item",
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            if (offset) {
                const targetPageRef = pageRefs.current[activePage];
                if (targetPageRef) {
                    const rect = targetPageRef.getBoundingClientRect();
                    const newItem = {
                        id: Date.now(),
                        type: item.type,
                        x: offset.x - rect.left - 50,
                        y: offset.y - rect.top - 50,
                        width: 100,
                        height: 50,
                        src: "",
                    };

                    setPages((prevPages) =>
                        prevPages.map((page) =>
                            page.id === activePage
                                ? { ...page, items: [...page.items, newItem] }
                                : page
                        )
                    );
                }
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <button className="h-10 w-40 bg-blue-500 rounded text-white mb-4">
                Download PDF
            </button>
            <div className="flex flex-wrap justify-center gap-8">
                {pages.map((page) => (
                    <div
                        key={page.id}
                        data-page-id={page.id}
                        ref={(el) => (pageRefs.current[page.id] = el)}
                        onClick={() => setActivePage(page.id)} // Set the page as active on click
                        className={`relative border bg-white shadow-lg ${activePage === page.id ? "border-blue-500" : "border-gray-300"
                            }`}
                        style={{
                            width: "100%",
                            maxWidth: "1150px",
                            cursor: "pointer",
                        }}
                    >
                        <div
                            ref={drop}
                            className="relative w-full h-full bg-white"
                            style={{
                                height: `${page.height}px`,
                                width: `${page.width}px`,
                            }}
                        >
                            {page.items.map((item) => (
                                <Rnd
                                    key={item.id}
                                    size={{ width: item.width, height: item.height }}
                                    position={{ x: item.x, y: item.y }}
                                    onDragStop={(e, data) =>
                                        handleResize(
                                            page.id,
                                            item.id,
                                            { width: item.width, height: item.height },
                                            data
                                        )
                                    }
                                    onResizeStop={(e, direction, ref, delta, position) =>
                                        handleResize(
                                            page.id,
                                            item.id,
                                            { width: ref.offsetWidth, height: ref.offsetHeight },
                                            position
                                        )
                                    }
                                    bounds="parent"
                                    className="absolute border border-black"
                                >
                                    <div className="relative group w-full h-full">
                                        {item.type === "text" ? (
                                            <div contentEditable className="w-full h-full">
                                                Editable Text
                                            </div>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                {item.src ? (
                                                    <img
                                                        src={item.src}
                                                        alt="User Uploaded"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            document.getElementById(`upload-${item.id}`).click()
                                                        }
                                                    >
                                                        Upload
                                                    </button>
                                                )}
                                                <input
                                                    id={`upload-${item.id}`}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        handleUploadImage(page.id, item.id, e.target.files[0])
                                                    }
                                                />
                                            </div>
                                        )}
                                        <button
                                            onClick={() => handleDeleteItem(page.id, item.id)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                                        >
                                            <MdOutlineDeleteOutline />
                                        </button>
                                    </div>
                                </Rnd>
                            ))}
                        </div>
                        {pages.length > 1 && (
                            <div className="absolute top-2 right-7 space-x-2 flex">
                                <button
                                    onClick={() => handleDeletePage(page.id)}
                                    className="text-red-500 text-2xl hover:text-red-700"
                                >
                                    <MdOutlineDeleteOutline />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={handleAddPage}
                    className="text-blue-500 hover:text-blue-700"
                >
                    Add Page
                </button>
            </div>
        </div>
    );
};

export default Page;
