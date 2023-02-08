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
          <IonButton>Upload</IonButton>
        </div>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
          />
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
