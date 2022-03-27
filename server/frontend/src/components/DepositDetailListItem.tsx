import {
    IonButton,
    IonFab,
    IonItem,
    IonLabel,
} from '@ionic/react';
import { useState } from 'react';
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
    updateReturnHandler: Function
    id: string
}

const DepositDetailListItem: React.FC<DepositDetailListItemProps> = (data) => {
    const allReturned = data.amount - data.returned === 0
    const [amountReturning, setAmountReturning] = useState(0)
    const increment = () => {
        if (amountReturning < data.amount - data.returned) {
            data.updateReturnHandler(data.id, amountReturning + 1)
            setAmountReturning(amountReturning + 1)
        }
    }

    const decrement = () => {
        if (amountReturning > 0) {
            data.updateReturnHandler(data.id, amountReturning - 1)
            setAmountReturning(amountReturning - 1)
        }
    }

    return (
        <IonItem disabled={allReturned} detail={false}>
            <IonLabel className="ion-text-wrap">
                <p> Typ {data.type}</p>
                <h2 color='primary' ><b>{data.productName}</b></h2>
                <h3> Preis/Stk: <b>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseInt(data.pricePerItem) / 100)} </b></h3>
                <h3> Retourniert {data.returned}/{data.amount}</h3>
            </IonLabel>
            <IonItem slot="end">
                <IonButton size='default' onClick={decrement}>
                    -
                </IonButton>
                &#160;{amountReturning}&#160;
                <IonButton size='default' onClick={increment}>
                    +
                </IonButton>

            </IonItem>


            {/* <IonLabel slot='end'>
                <p> Returned:</p>
                <h2>
                    {data.returnDates.map((value, index) => {
                        return <li key={index}>{value.date}</li>
                    })}
                </h2>
            </IonLabel> */}
        </IonItem >
    );
};

export default DepositDetailListItem;
