import {
    IonButton,
    IonItem,
    IonLabel,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import './custom.css';

interface DepositItemListItemProps {
    withButtons: boolean
    type: string
    productName: string
    amount: number
    returned: number
    returnDates: [{
        type: string
        date: string
    }]
    pricePerItem: string
    updateReturnHandler: Function
    id: string
    depositTypeId: string
}

const DepositItemListItem: React.FC<DepositItemListItemProps> = (data) => {
    const allReturned = data.amount - data.returned === 0

    const [amountReturning, setAmountReturning] = useState(0)
    const increment = () => {
        if (amountReturning < data.amount - data.returned) {
            data.updateReturnHandler(data.id, amountReturning + 1, data.depositTypeId, data.type)
            setAmountReturning(amountReturning + 1)
        }
    }

    const decrement = () => {
        if (amountReturning > 0) {
            data.updateReturnHandler(data.id, amountReturning - 1, data.depositTypeId, data.type)
            setAmountReturning(amountReturning - 1)
        }
    }

    useEffect(() => {
        setAmountReturning(0)
    }, [data.amount, data.returned])
    return (
        <IonItem disabled={allReturned} detail={false}>
            <IonItem lines='none'>
                <b>{data.amount - data.returned}</b>&#160;
            </IonItem>
            <IonLabel className="ion-text-wrap">
                <h2 style={{ color: '#519e8b', fontWeight: 'bold' }}> {data.type}</h2>
                <h2 color='primary' ><b>{data.productName}</b></h2>
                <h3> Preis/Stk: <b>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseInt(data.pricePerItem) / 100)} </b></h3>
            </IonLabel>

            <IonItem hidden={!data.withButtons} slot="end" style={{ marginLeft: "unset" }}>
                <IonButton size='default' onClick={decrement}>
                    -
                </IonButton>
                &#160;{amountReturning}&#160;
                <IonButton size='default' onClick={increment}>
                    +
                </IonButton>
            </IonItem>
        </IonItem >
    );
};

export default DepositItemListItem;
