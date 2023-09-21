import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';

const GalleryItem = ({ image, index, moveImage }) => {
  const [, ref] = useDrag({
    type: 'GALLERY_ITEM',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'GALLERY_ITEM',
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleTouchStart = () => {
    setIsHovered(true);
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={(node) => {
        ref(drop(node));
      }}
      style={{
        border: isHovered ? '2px dashed #007bff' : '2px solid transparent',
        transition: 'border 0.3s',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img src={image.url} alt={image.title} />
      <div className="image-tags">
        {Array.isArray(image.tags) && image.tags.map((tag, tagIndex) => (
          <span key={tagIndex} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

const Gallery = ({ images }) => {
  const [imageOrder, setImageOrder] = useState([...images]);
  const [searchTerm, setSearchTerm] = useState('');

  const moveImage = (fromIndex, toIndex) => {
    const updatedOrder = [...imageOrder];
    const [movedImage] = updatedOrder.splice(fromIndex, 1);
    updatedOrder.splice(toIndex, 0, movedImage);
    setImageOrder(updatedOrder);
  };

  const filteredImages = imageOrder.filter((image) =>
    Array.isArray(image.tags) && image.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div>
        <div>
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2 pl-3 text-sm text-gray-50 
              border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 
              focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
              dark:focus:border-primary-500"
          />
        </div>
      </div>
    <DndProvider backend={window.TouchEvent ? TouchBackend : HTML5Backend}>
      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <Gallery
            key={image.id}
            image={image}
            index={index}
            moveImage={moveImage}
          />
        ))}
      </div>
    </DndProvider>   
      <div className="mt-2 mb-6">
        <h1 className='text-white text-center font-bold text-2xl'>IMAGE GALLERY</h1>
        <ul className='sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center'>
          {imageOrder.map((image, index) => (
            <li className="mx-8 mb-6 px-2" >
              <div className="bg-gray-900 pb-3 my-10 text-white">
                <GalleryItem
                  key={image.id}
                  image={image}
                  index={index}
                  moveImage={moveImage}
                  className="rounded-[15px] w-full h-[50%]"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};



export default function ImageGallery() {
  // Sample image data (replace with your own data)
  const images = [
    { 
      id: 1, 
      url: 'https://images.unsplash.com/photo-1694845479853-c9721af5a191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 1',
      tags: 'animals',
    },
    { 
      id: 2, 
      url: 'https://plus.unsplash.com/premium_photo-1694704424069-8c32027a6f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 2',
      tags: 'animals',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1692911470431-9820cc52c01c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 2',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1691135319989-8ae7dd70571a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 2',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1682687982093-4773cb0dbc2e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 9',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1694817322913-2aab0898c577?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 7',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1694843690023-3d936b2e83b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 3',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://plus.unsplash.com/premium_photo-1694124534101-444a039aee89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60', 
      title: 'Image 2',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1695026513693-451e1aac043f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      title: 'Image 2',
      tags: 'engineering',
    },
    { 
      id: 2, 
      url: 'https://images.unsplash.com/photo-1695051626405-e6a288c882d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=700&q=60',
      title: 'Image 2',
      tags: 'engineering',
    },
    // Add more images here
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Gallery images={images} />
    </DndProvider>
  );
}
