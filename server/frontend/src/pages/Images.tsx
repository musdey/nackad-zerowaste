/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  IonContent,
  IonPage,
  IonFooter,
  IonGrid,
  IonCard,
  IonButton,
  IonImg,
  IonSpinner,
  IonModal,
  IonHeader,
  IonButtons,
  IonToolbar,
} from "@ionic/react";
import { OverlayEventDetail } from "@ionic/core/components";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from "../components/Header";
import api from "../lib/api";
import Webcam from "react-webcam";

type ImageCardProps = {
  deliveryId: string;
  imageId: string;
};

const ImageCard: React.FC<ImageCardProps> = (props: ImageCardProps) => {
  const [source, setSource] = useState("");
  useEffect(() => {
    const fn = async () => {
      const fetched = await api.getImage(props.deliveryId, props.imageId);
      const newUrl = URL.createObjectURL(fetched);
      setSource(newUrl);
    };
    fn();
  }, []);
  return (
    <IonCard>
      {source ? (
        <div>
          <IonImg alt="uploaded_image" src={source} />
          <IonButton
            // disabled
            fill="clear"
            onClick={() => api.deleteImage(props.deliveryId, props.imageId)}>
            Delete
          </IonButton>
        </div>
      ) : (
        <IonSpinner name="crescent"></IonSpinner>
      )}
    </IonCard>
  );
};

const Images: React.FC = () => {
  const { loggedIn } = useAuth();
  const params = useParams<{ deliveryId: string }>();
  const [images, setImages] = useState<Array<string> | undefined>();
  const [uploading, setUploading] = useState<boolean>(false);
  const modal = useRef<HTMLIonModalElement>(null);
  const webcamRef = React.useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = React.useState<string | null>(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc!);
  }, [webcamRef, setImgSrc]);

  function confirm() {
    modal.current?.dismiss(imgSrc, "confirm");
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === "confirm") {
      setUploading(true);
      api.sendImage(params.deliveryId, ev.detail.data).then(() => {
        setUploading(false);
        getDelivery();
      });
    }
  }

  const getDelivery = async () => {
    const result = await api.getDelivery(params.deliveryId);
    setImages(result.images || undefined);
  };

  useEffect(() => {
    getDelivery();
  }, []);

  if (!loggedIn) {
    const url = "/login";
    return <Redirect to={url} />;
  }
  const setImage = (_event: any) => {
    if (_event.target.files && _event.target.files.length !== 0) {
      let file = _event.target.files![0];
      setUploading(true);
      api.sendImage(params.deliveryId, file).then(() => {
        setUploading(false);
        getDelivery();
      });
    }
  };
  const openFileDialog = () => {
    (document as any).getElementById("icon-button-file").click();
  };
  return (
    <IonPage>
      <Header subTitle={"Images " + params.deliveryId} />
      <IonContent fullscreen>
        <div
          style={{
            paddingTop: "8px",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={setImage}
          />
          <label onClick={openFileDialog} htmlFor="icon-button-file">
            <IonButton>Upload</IonButton>
          </label>
          <IonButton id="open-modal" expand="block">
            Click
          </IonButton>
          {uploading && <IonSpinner name="crescent"></IonSpinner>}
        </div>
        <IonModal
          ref={modal}
          trigger="open-modal"
          onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Cancel
                </IonButton>
              </IonButtons>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => confirm()}>
                  Upload
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding ion-border-xl">
            <>
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
              <IonButton onClick={capture}>Capture photo</IonButton>
              {imgSrc && <IonImg src={imgSrc} />}
            </>
          </IonContent>
        </IonModal>
        {images &&
          images.map((image) => (
            <ImageCard
              key={image}
              deliveryId={params.deliveryId}
              imageId={image}
            />
          ))}
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding"></IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Images;
