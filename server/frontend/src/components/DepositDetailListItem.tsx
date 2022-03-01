import {
    IonButton,
    IonButtons,
    IonImg,
    IonItem,
    IonLabel,
} from '@ionic/react';
import { useEffect, useState } from 'react';
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
    returnHandler: Function
}

const DepositDetailListItem: React.FC<DepositDetailListItemProps> = (data) => {
    const allReturned = data.amount - data.returned === 0
    const [amountReturning, setAmountReturning] = useState(0)
    const increment = () => {
        setAmountReturning(amountReturning + 1)
        data.returnHandler(amountReturning)
    }

    const decrement = () => {
        setAmountReturning(amountReturning - 1)
    }

    return (
        <IonItem disabled={allReturned} detail={false}>
            <IonLabel className="ion-text-wrap">
                <p> Typ {data.type}</p>
                <h2 color='primary' >{data.productName}</h2>
                <h3> Preis/Stk: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseInt(data.pricePerItem) / 100)}</h3>
                <h3> Retourniert {data.returned}/{data.amount}</h3>
            </IonLabel>
            <IonItem slot="end">
                <IonButton onClick={increment}>
                    +
                </IonButton>
                {amountReturning}
                <IonButton onClick={decrement}>
                    -
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
