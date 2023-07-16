"use client";

import React, { useCallback, useState } from "react";
import { getCroppedImg, getRotatedImage } from "../utils/canvasUtils";
import { getOrientation } from "get-orientation";
import CModal from "./CModal";
import { useManagedUI } from "../utils/context/ManagedUI";
import Cropper from "react-easy-crop";

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const CForm = () => {
  const [imageSrc, setImageSrc] = React.useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const { isModalOpen, setModalOpen } = useManagedUI();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", croppedImage);
      setModalOpen(false);
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error("Error" + e);
    }
  }, [imageSrc, croppedAreaPixels, rotation]);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      try {
        // apply rotation if needed
        const orientation = await getOrientation(file);
        const rotation = ORIENTATION_TO_ANGLE[orientation];
        console.table({ Orientation: orientation, Rotation: rotation });
        if (rotation) {
          imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
        }
      } catch (e) {
        console.warn("Error : " + e.message);
      }
      setImageSrc(imageDataUrl);
      setModalOpen(true);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-sm-12">
          <div
            className="align-self-center"
            style={{
              width: "120px",
              height: "150px",
              margin: "10px auto",
              border: "1px solid #000000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {imageSrc ? (
              croppedImage ? (
                <img
                  src={croppedImage}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                  alt=""
                />
              ) : (
                <React.Fragment>
                  <CModal
                    isOpen={isModalOpen}
                    modalTitle="Upload Students Proper Photo"
                  >
                    <div className="modal-body">
                      <div
                        className="card border-primary mb-3"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          alignItems: "center",
                        }}
                      >
                        <div className="card-header"></div>
                        <div
                          className="card-body"
                          style={{
                            position: "relative",
                            width: "100%",
                            height: 400,
                            background: "#333",
                          }}
                        >
                          <Cropper
                            image={imageSrc}
                            crop={crop}
                            rotation={rotation}
                            zoom={zoom}
                            aspect={3 / 4}
                            onCropChange={setCrop}
                            onRotationChange={setRotation}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="container">
                        <div className="row">
                          <div className="col">
                            <label htmlFor="Zoom" className="form-label">
                              Zoom
                            </label>
                            <input
                              value={zoom}
                              min={1}
                              max={3}
                              step={0.1}
                              aria-labelledby="Zoom"
                              type="range"
                              className="form-range"
                              id="Zoom"
                              onChange={(e, zoom) => setZoom(zoom)}
                            />
                          </div>
                          <div className="col">
                            <label htmlFor="Rotation" className="form-label">
                              Rotation
                            </label>
                            <input
                              value={rotation}
                              min={0}
                              max={360}
                              step={1}
                              aria-labelledby="Rotation"
                              type="range"
                              className="form-range"
                              id="Rotation"
                              onChange={(e, rotation) => setRotation(rotation)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        onClick={showCroppedImage}
                        className="btn btn-primary"
                      >
                        Save changes
                      </button>
                    </div>
                  </CModal>
                </React.Fragment>
              )
            ) : (
              <input type="file" onChange={onFileChange} accept="image/*" />
            )}
          </div>
        </div>
        <div
          className="col-sm-3 align-self-center"
          style={{ margin: "0px auto", textAlign: "center" }}
        >
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Student's Name"
          />
        </div>
      </div>
    </div>
  );
};

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

export default CForm;
