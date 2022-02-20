import {
    IonImg,
    IonItem,
    IonLabel,
} from '@ionic/react';
import './custom.css';

interface DepositDetailListItemProps {
    type: string
    productName: string
    amount: number
    returned: number
    returnDates: [{
        type: string
        date: string
    }]
    pricePerItem: string
}

const DepositDetailListItem: React.FC<DepositDetailListItemProps> = (data) => {
    const allReturned = data.amount - data.returned === 0
    return (
        <IonItem disabled={allReturned} detail={false}>
            <IonLabel className="ion-text-wrap">
                <p> Type {data.type}</p>
                <h2 color='primary' >{data.productName}</h2>
                <h3> Price per Item {data.pricePerItem}</h3>
                <h3>Returned {data.returned}/{data.amount}</h3>
            </IonLabel>
            <IonLabel slot='end'>
                <p> Returned:</p>
                <h2>
                    {data.returnDates.map((value, index) => {
                        return <li key={index}>{value.date}</li>
                    })}
                </h2>
            </IonLabel>
        </IonItem >
    );
};

export default DepositDetailListItem;
