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
    deliveryId: string
}

const OverviewListItem: React.FC<OverviewListItemProps> = (listData) => {

    const history = useHistory()

    const isToday = (someDate: Date) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    const isTomorrow = (someDate: Date) => {
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 1)
        return someDate.getDate() === tomorrow.getDate() &&
            someDate.getMonth() === tomorrow.getMonth() &&
            someDate.getFullYear() === tomorrow.getFullYear()
    }

    const isDayAfterTomorrow = (someDate: Date) => {
        const today = new Date()
        let tomorrow = new Date()
        tomorrow.setDate(today.getDate() + 2)
        return someDate.getDate() === tomorrow.getDate() &&
            someDate.getMonth() === tomorrow.getMonth() &&
            someDate.getFullYear() === tomorrow.getFullYear()
    }

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
                <p>Id {listData.orderId.substring(0, 15)}</p>
                <h2>
                    {listData.firstName} {listData.lastName}
                </h2>
                <h3>{listData.address.street},{listData.address.extra} {listData.address.postal}, {listData.address.city}</h3>
            </IonLabel>
            <IonLabel slot='end'>
                {isToday(new Date(listData.deliveryDay)) &&
                    <p style={{ color: "green" }}>  <b> Heute </b></p>
                }

                {isTomorrow(new Date(listData.deliveryDay)) &&
                    <p style={{ color: "red" }}>  <b> Morgen </b></p>
                }

                {isDayAfterTomorrow(new Date(listData.deliveryDay)) &&
                    <p style={{ color: "red" }}>  <b> Übermorgen </b></p>
                }

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
