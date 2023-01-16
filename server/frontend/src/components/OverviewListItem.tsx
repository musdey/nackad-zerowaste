import {
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
} from '@ionic/react';
import { useHistory } from 'react-router';
import './custom.css';
import { carOutline, homeOutline } from 'ionicons/icons';

interface OverviewListItemProps {
    firstName: string
    lastName: string
    address: {
        address1: string
        address2?: string
        zip: string
        city: string
    }
    orderId: string
    deliveryStatus: 'OPEN' | 'PACKED' | 'INDELIVERY' | 'DELIVERED' | 'CANCELLED'
    timeslot: string
    deliveryDay: string
    user: {
        address: {
            address1: string, address2: string, city: string, zip: string, province: string, email: string, emailIsVerified: boolean, firstName: string, lastName: string
            , phoneNumber: string, shopifyUserId: string, _id: string
        }
        _id: string
    }
    deliveryId: string
    type: string
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
            {listData.deliveryStatus === 'OPEN' ? <IonImg class='overviewitemimg' src='./assets/images/green-circle.png' />
                :
                listData.deliveryStatus === 'PACKED' ? <IonImg class='overviewitemimg' src='./assets/images/orange2-circle.png' />
                    :
                    <IonImg class='overviewitemimg' src='./assets/images/violet-circle.png' />
            }
            <p style={{ width: "5px" }}> </p>
            {listData.type === "DELIVERY" ? <IonIcon icon={carOutline} ></IonIcon>
                :
                <IonIcon icon={homeOutline} ></IonIcon>
            }
            <div style={{ width: '20px' }}></div>
            <IonLabel className="ion-text-wrap">
                {/* <p>Id {listData.orderId.substring(0, 15)}</p> */}
                <h2>
                    <b> {listData.firstName} {listData.lastName} </b>
                </h2>
                {listData.type === "DELIVERY" ?
                    <div>
                        <h3>{listData.address.address1}</h3>
                        {listData.address.address2 &&
                            <h3 style={{ WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', display: '-webkit-box', textOverflow: 'ellipsis', overflow: 'hidden' }}>{listData.address.address2}</h3>
                        }
                        <h3>{listData.address.zip}, {listData.address.city}</h3>
                    </div>
                    :
                    <h3>Abholung im Lager</h3>
                }
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
