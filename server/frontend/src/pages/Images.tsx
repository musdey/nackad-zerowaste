/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonFooter,
  IonGrid,
  IonCard,
  IonButton,
} from "@ionic/react";
import { useAuth } from "../lib/use-auth";
import { Redirect, useParams } from "react-router";
import { Header } from "../components/Header";
import api from "../lib/api";

const Images: React.FC = (props) => {
  const { loggedIn } = useAuth();
  const params = useParams<{ deliveryId: string }>();
  const [images, setImages] = useState<Array<string> | undefined>();
  const [source, setSource] = useState("");

  useEffect(() => {
    const fn = async () => {
      const result = await api.getDelivery(params.deliveryId);
      setImages(result.images || undefined);
    };
    fn();
  }, []);

  if (!loggedIn) {
    const url = "/login";
    return <Redirect to={url} />;
  }
  const setImage = (_event: any) => {
    if (_event.target.files && _event.target.files.length !== 0) {
      let file = _event.target.files![0];
      console.log(file);
      const newUrl = URL.createObjectURL(file);
      setSource(newUrl);
      api.sendImage(params.deliveryId, file);
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
        </div>
        <IonCard>
          <img alt="uploaded_image" src={source} />
          <IonButton fill="clear">Delete</IonButton>
        </IonCard>
      </IonContent>
      <IonFooter>
        <IonGrid className="ion-no-margin ion-no-padding"></IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default Images;
