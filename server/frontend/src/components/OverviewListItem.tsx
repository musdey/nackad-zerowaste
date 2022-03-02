import {
    IonImg,
    IonItem,
    IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router';
import './custom.css';
interface OverviewListItemProps {
    firstName: string
    lastName: string
    address: {
        street: string
        postal: string
        extra?: string
        city: string
    }
    orderId: string
    deliveryStatus: 'OPEN' | 'INDELIVERY' | 'DELIVERED' | 'CANCELLED'
    timeslot: string
    deliveryDay: string
    userId: string
}

const OverviewListItem: React.FC<OverviewListItemProps> = (listData) => {

    const history = useHistory()

    const handleClick = () => {
        history.push('/order/' + listData.orderId, {
            state: listData
        })
    }

    return (
        <IonItem onClick={handleClick} detail={false}>
            {listData.deliveryStatus === 'OPEN' ? <IonImg class='overviewitemimg' slot='start' src='./assets/images/green-circle.png' />
                :
                listData.deliveryStatus === 'INDELIVERY' ? <IonImg class='overviewitemimg' slot='start' src='./assets/images/orange-circle.png' />
                    :
                    <IonImg class='overviewitemimg' slot='start' src='./assets/images/red-circle.png' />
            }
            <IonLabel className="ion-text-wrap">
                <p>Id {listData.orderId}</p>
                <h2>
                    {listData.firstName} {listData.lastName}
                </h2>
                <h3>{listData.address.street},{listData.address.extra} {listData.address.postal}, {listData.address.city}</h3>
            </IonLabel>
            <IonLabel slot='end'>
                <p> Timeslot</p>
                <p>
                    {new Date(listData.deliveryDay).toLocaleDateString()}
                </p>
                <h2 color='primary'>
                    {listData.timeslot}
                </h2>
                <h3> </h3>
            </IonLabel>
        </IonItem >
    );
};

export default OverviewListItem;
