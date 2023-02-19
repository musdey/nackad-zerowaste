/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonFooter,
  IonGrid,
  IonCard,
  IonButton,
  IonImg,
  IonSpinner,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from "../components/Header";
import api from "../lib/api";

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
            disabled
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
          {uploading && <IonSpinner name="crescent"></IonSpinner>}
        </div>
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
