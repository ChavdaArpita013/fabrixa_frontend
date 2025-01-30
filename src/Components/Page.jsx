import React, { useState, useRef } from "react";
import { useDrop } from "react-dnd";
import { MdAddCircleOutline, MdOutlineDeleteOutline } from "react-icons/md";
import { Rnd } from "react-rnd";
import { createNewTechPack } from "../api/TechPackAPI";
import Cookies from 'js-cookie';
import { generatePdf } from "../utils/pdfGenerate";

const Page = () => {
    const [pages, setPages] = useState([{ id: 1, items: [], height: 890, width: 1150 }]);
    console.log("page:", pages);
    const [activeItemId, setActiveItemId] = useState(null);
    const [activePage, setActivePage] = useState(1); // Track the active page
    const pageRefs = useRef({}); // To store references for each page
    const createdBy = Cookies.get('name');
    // Function to prepare techPackData
    const prepareTechPackData = () => {
        return pages.map((page) => ({
            id: page.id,
            height: page.height,
            width: page.width,
            items: page.items.map((item) => {
                const content = item.type === "text"
                    ? document.querySelector(`[data-item-id="${item.id}"]`)?.innerText || "Editable Text"
                    : undefined;

                return {
                    id: item.id,
                    type: item.type,
                    x: item.x,
                    y: item.y,
                    width: item.width,
                    height: item.height,
                    ...(item.type === "table" ? { rows: item.rows, columns: item.columns } : {}),
                    ...(item.type === "text" ? { content } : {}),
                    ...(item.src ? { src: item.src } : {}),
                };
            }),
        }));
    };

    // Handles resizing and repositioning of items
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

    // Drop logic for adding items to the active page only
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "sidebar-item",
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            if (offset) {
                const targetPageRef = pageRefs.current[activePage];
                if (targetPageRef) {
                    const rect = targetPageRef.getBoundingClientRect();
                    let newItem;

                    switch (item.type) {
                        case "text":
                            newItem = {
                                id: Date.now(),
                                type: "text",
                                x: offset.x - rect.left - 50,
                                y: offset.y - rect.top - 50,
                                width: 100,
                                height: 50,
                                src: "",
                            };
                            break;

                        case "image":
                            newItem = {
                                id: Date.now(),
                                type: "image",
                                x: offset.x - rect.left,
                                y: offset.y - rect.top,
                                width: 150, // Default width for image placeholder
                                height: 150, // Default height for image placeholder
                                src: "", // Placeholder for image source
                            };
                            break;


                        case "line-horizontal":
                            newItem = {
                                id: Date.now(),
                                type: "line-horizontal",
                                x: offset.x - rect.left,
                                y: offset.y - rect.top,
                                width: 300, // Default width
                                height: 2, // Thin line
                            };
                            break;

                        case "line-vertical":
                            newItem = {
                                id: Date.now(),
                                type: "line-vertical",
                                x: offset.x - rect.left,
                                y: offset.y - rect.top,
                                width: 2, // Thin line
                                height: 300, // Default height
                            };
                            break;

                        // case "table":
                        //     newItem = {
                        //         id: Date.now(),
                        //         type: "table",
                        //         x: offset.x - rect.left,
                        //         y: offset.y - rect.top,
                        //         rows: 3, // Default rows
                        //         columns: 3, // Default columns
                        //     };
                        //     break;

                        default:
                            break;
                    }

                    if (newItem) {
                        setPages((prevPages) =>
                            prevPages.map((page) =>
                                page.id === activePage
                                    ? { ...page, items: [...page.items, newItem] }
                                    : page
                            )
                        );
                    }
                }
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const handleTextUpdate = (pageId, itemId, newText) => {
        setPages((prevPages) =>
            prevPages.map((page) =>
                page.id === pageId
                    ? {
                        ...page,
                        items: page.items.map((item) =>
                            item.id === itemId ? { ...item, content: newText } : item
                        ),
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
    const sanitizePages = (pages) => {
        return pages.map((page) => ({
            ...page,
            items: page.items.map((item) => {
                const { node, ...sanitizedItem } = item; // Remove the problematic `node` property
                return sanitizedItem;
            }),
        }));
    };
    const handleSaveButtonClick = async () => {


        const sanitizedPages = sanitizePages(pages);
        const response = await createNewTechPack(sanitizedPages);
        console.log("Sanitized Pages:", JSON.stringify(sanitizedPages, null, 2));

        // const response = await createNewTechPack(pages);
        console.log(response);
        if (response) {
            alert("saved Successfully")
        }

    }

    const handleDownloadButtonClick = async () => {
        await generatePdf(pages);
        console.log("PDF Generated successfully!");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <button
                onClick={handleSaveButtonClick}
                className="h-10 w-40 bg-blue-500 sticky rounded text-white mb-4"
            >
                Save Tech Pack
            </button>
            <button className="h-10 w-40 bg-blue-500 sticky rounded text-white mb-4" onClick={handleDownloadButtonClick}>
                Download
            </button>
            <div className="flex flex-wrap justify-center gap-8">
                {pages.map((page) => (
                    <div
                        key={page.id}
                        data-page-id={page.id}
                        ref={(el) => (pageRefs.current[page.id] = el)}
                        onClick={() => setActivePage(page.id)}
                        className={`relative border bg-white shadow-lg ${activePage === page.id
                            ? "border-blue-500"
                            : "border-gray-300"
                            }`}
                        style={{
                            width: "100%",
                            maxWidth: "1150px",
                            cursor: "pointer",
                        }}
                    >
                        <div
                            ref={activePage === page.id ? drop : null}
                            className="relative w-full h-full bg-white"
                            style={{
                                height: `${page.height}px`,
                                width: `${page.width}px`,
                            }}
                        >
                            {page.items.map((item) => (
                                <Rnd
                                    key={item.id}
                                    size={{
                                        width: item.type === "line-vertical" ? 1 : item.width,
                                        height: item.type === "line-horizontal" ? 1 : item.height,
                                    }}
                                    position={{ x: item.x, y: item.y }}
                                    onDragStop={(e, data) =>
                                        handleResize(
                                            page.id,
                                            item.id,
                                            {
                                                width: item.width,
                                                height: item.height,
                                            },
                                            data
                                        )
                                    }
                                    onResizeStop={(e, direction, ref, delta, position) => {
                                        const updatedDimensions = {
                                            width:
                                                item.type === "line-vertical"
                                                    ? 1
                                                    : ref.offsetWidth,
                                            height:
                                                item.type === "line-horizontal"
                                                    ? 1
                                                    : ref.offsetHeight,
                                        };

                                        handleResize(page.id, item.id, updatedDimensions, position);
                                    }}
                                    bounds="parent"
                                    className={`absolute border ${activeItemId === item.id
                                        ? "border-black"
                                        : "border-transparent"
                                        }`}
                                    onMouseEnter={() => setActiveItemId(item.id)}
                                    onMouseLeave={() => setActiveItemId(null)}
                                    onClick={() => setActiveItemId(item.id)}
                                >
                                    <div className="relative group w-full h-full">
                                        {item.type === "text" ? (
                                            <div
                                                contentEditable
                                                className="w-full h-full"
                                                data-item-id={item.id}
                                                onBlur={(e) => {
                                                    const updatedContent =
                                                        e.target.textContent;
                                                    handleTextUpdate(
                                                        page.id,
                                                        item.id,
                                                        updatedContent
                                                    );
                                                }}
                                            >
                                                {item.content || "Editable Text"}
                                            </div>
                                        ) : item.type === "image" ? (
                                            <div className="w-full h-full flex items-center justify-center border border-gray-300">
                                                {item.src ? (
                                                    <img
                                                        src={item.src}
                                                        alt="Uploaded"
                                                        className="w-full h-full"
                                                    />
                                                ) : (
                                                    <div>
                                                        <button
                                                            onClick={() =>
                                                                document
                                                                    .getElementById(
                                                                        `upload-${item.id}`
                                                                    )
                                                                    .click()
                                                            }
                                                            className="text-blue-500"
                                                        >
                                                            Upload Image
                                                        </button>
                                                        <input
                                                            id={`upload-${item.id}`}
                                                            type="file"
                                                            className="hidden"
                                                            onChange={(e) =>
                                                                handleUploadImage(
                                                                    page.id,
                                                                    item.id,
                                                                    e.target.files[0]
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : item.type === "line-horizontal" ? (
                                            <div
                                                className="bg-black"
                                                style={{
                                                    width: `${item.width}px`,
                                                    height: "1px",
                                                }}
                                            ></div>
                                        ) : item.type === "line-vertical" ? (
                                            <div
                                                className="bg-black"
                                                style={{
                                                    width: "1px",
                                                    height: `${item.height}px`,
                                                }}
                                            ></div>
                                        ) : null}
                                        <button
                                            onClick={() =>
                                                handleDeleteItem(page.id, item.id)
                                            }
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100"
                                        >
                                            <MdOutlineDeleteOutline />
                                        </button>
                                    </div>
                                </Rnd>
                            ))}
                        </div>
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
