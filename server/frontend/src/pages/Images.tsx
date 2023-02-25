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
  IonFab,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonLabel,
  IonItem,
} from "@ionic/react";
import { add, camera, image } from "ionicons/icons";
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
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    const fn = async () => {
      const fetched = await api.getImage(props.deliveryId, props.imageId);
      const newUrl = URL.createObjectURL(fetched);
      setSource(newUrl);
      setFetching(false);
    };
    fn();
  }, []);
  return (
    <IonCard>
      <IonItem lines="none" disabled hidden={!fetching}>
        <IonLabel>Fetching</IonLabel>
        <IonSpinner name="crescent" />
      </IonItem>
      {source && (
        <>
          <IonImg alt="uploaded_image" src={source} />
          <IonButton
            // disabled
            fill="clear"
            onClick={() => api.deleteImage(props.deliveryId, props.imageId)}>
            Delete
          </IonButton>
        </>
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
  return (
    <IonPage>
      <Header subTitle={"Images " + params.deliveryId} />
      <IonContent>
        <IonItem disabled hidden={!uploading}>
          <IonLabel>Uploading</IonLabel>
          <IonSpinner name="crescent" />
        </IonItem>
        <IonItem disabled hidden={uploading || (images && images.length !== 0)}>
          <IonLabel>No images uploaded</IonLabel>
        </IonItem>
        {images &&
          images.length > 0 &&
          images.map((image) => (
            <ImageCard
              key={image}
              deliveryId={params.deliveryId}
              imageId={image}
            />
          ))}
        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton
              onClick={() =>
                (document as any).getElementById("icon-button-camera").click()
              }>
              <input
                style={{ display: "none" }}
                accept="image/*"
                id="icon-button-camera"
                type="file"
                capture="environment"
                onChange={setImage}
              />
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
            <IonFabButton
              onClick={() =>
                (document as any).getElementById("icon-button-file").click()
              }>
              <input
                style={{ display: "none" }}
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={setImage}
              />
              <IonIcon icon={image}></IonIcon>
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding"></IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Images;
