import { faArrowLeft, faArrowRight, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState(null); 
  const [images, setImages] = useState([]); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fileInputRef = useRef(null); 

  const content = {
    aboutMe: 'This is the About This is the About Me content.This is the About Me content.This is the About Me content.This is the About Me content.This is the About Me content.This is the About Me content.Me content.This is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me contentThis is the About Me content. This is the About Me content This is the About Me content...',
    experience: 'This is the Experience content. You can write about your work experience here.',
    recommended: 'This is the Recommended content. It can have recommendations or feedback...'
  };

  const handleAddImage = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 3));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 3 ? prevIndex + 1 : 0));
  };

  const triggerFileInput = () => {
    fileInputRef.current.click(); 
  };

  return (
    <div className="main-container">
      <div className="left">Left Side</div>
      <div className="right">
        {/* Up Container */}
        <div className="up">
          <div className="icon-and-buttons">
            <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
            <div className="buttons">
              <button onClick={() => setActiveTab('aboutMe')}>About Me</button>
              <button onClick={() => setActiveTab('experience')}>Experience</button>
              <button onClick={() => setActiveTab('recommended')}>Recommended</button>
            </div>
          </div>

          <div className="grid-and-content">
            {activeTab && (
              <div className="content-box">
                <p>{content[activeTab]}</p>
              </div>
            )}
          </div>
        </div>

        {/* Down Container */}
        <div className="down">
          {/* Section 1: Icon, Add Image Button, and Navigation Arrows */}
          <div className="down-section-1">
            <div className="down-left">
              <FontAwesomeIcon icon={faQuestionCircle} className="icon" />
              <button className="gallery-btn" onClick={triggerFileInput}>Gallery</button>
            </div>
            <div className="down-right">
              <input 
                type="file" 
                accept="image/*" 
                multiple 
                onChange={handleAddImage} 
                className="file-input"
                ref={fileInputRef} 
                style={{ display: 'none' }} 
              />
              <button className="add-image-btn" onClick={triggerFileInput}>+Addimage</button>
              <FontAwesomeIcon icon={faArrowLeft} className="nav-icon" onClick={handlePrevImage} />
              <FontAwesomeIcon icon={faArrowRight} className="nav-icon" onClick={handleNextImage} />
            </div>
          </div>

          {/* Section 2: Image Boxes */}
          <div className="down-section-2">
            <div className="image-carousel">
              {images.length === 0 ? (
                <div className="empty-boxes">
                  <div className="image-box"></div>
                  <div className="image-box"></div>
                  <div className="image-box"></div>
                </div>
              ) : (
                images.slice(currentImageIndex, currentImageIndex + 3).map((image, index) => (
                  <div key={index} className="image-box">
                    <img src={image} alt={`Gallery ${index + 1}`} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
