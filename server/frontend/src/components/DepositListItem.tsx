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
                <p> Pfand {data.depositId}</p>
                <h2>
                    Status {data.status}
                </h2>
                <h3>Erstellt {new Date(data.orderDate).toLocaleDateString()}</h3>
            </IonLabel>
            <IonLabel slot='end'>
                <p slot="end"> Bezahlt</p>
                <h2>
                    {data.paidDeposit || 0}/{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(parseInt(data.totalPrice) / 100)}
                </h2>
                <h3></h3>
            </IonLabel>
        </IonItem >
    );
};

export default DepositListItem;
