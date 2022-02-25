import {
    IonImg,
    IonItem,
    IonLabel,
} from '@ionic/react';
import './custom.css';

interface OverviewListItemProps {
    firstName: string
    lastName: string
    address: {
        street: string
        postal: string
        city: string
    }
    orderId: string
    deliveryStatus: 'OPEN' | 'INDELIVERY' | 'DELIVERED' | 'CANCELLED'
    timeslot: string
}

const OverviewListItem: React.FC<OverviewListItemProps> = (data) => {
    return (
        <IonItem routerLink={`/order/${data.orderId}`} detail={false}>
            {data.deliveryStatus === 'OPEN' ? <IonImg class='overviewitemimg' slot='start' src='./assets/images/green-circle.png' />
                :
                data.deliveryStatus === 'INDELIVERY' ? <IonImg class='overviewitemimg' slot='start' src='./assets/images/orange-circle.png' />
                    :
                    <IonImg class='overviewitemimg' slot='start' src='./assets/images/red-circle.png' />
            }
            <IonLabel className="ion-text-wrap">
                <p>Id {data.orderId}</p>
                <h2>
                    {data.firstName} {data.lastName}
                </h2>
                <h3>{data.address.street}, {data.address.postal} {data.address.city}</h3>
            </IonLabel>
            <IonLabel slot='end'>
                <p> Timeslot</p>
                <h2>
                    {data.timeslot}
                </h2>
                <h3></h3>
            </IonLabel>
        </IonItem >
    );
};

export default OverviewListItem;
