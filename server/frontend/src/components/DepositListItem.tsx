import {
    IonItem,
    IonLabel,
} from '@ionic/react';
import './custom.css';

interface DepositListItemProps {
    status: 'OPEN' | 'PARTIALLYRETURNED' | 'RETURNED'
    totalPrice: string
    paidDeposit: string
    depositId: string
    orderDate: string
}

const DepositListItem: React.FC<DepositListItemProps> = (data) => {
    const allReturned: boolean = Number.parseFloat(data.totalPrice) - Number.parseFloat(data.paidDeposit) === 0

    return (
        <IonItem disabled={allReturned} routerLink={`/deposit/${data.depositId}`} detail={false}>
            <IonLabel className="ion-text-wrap">
                <p> Deposit {data.depositId}</p>
                <h2>
                    Status {data.status}
                </h2>
                <h3>Created {data.orderDate}</h3>
            </IonLabel>
            <IonLabel slot='end'>
                <p> Paid </p>
                <h2>
                    {data.paidDeposit}/{data.totalPrice}
                </h2>
                <h3></h3>
            </IonLabel>
        </IonItem >
    );
};

export default DepositListItem;
