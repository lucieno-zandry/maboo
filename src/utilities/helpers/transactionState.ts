import { Transaction } from "../constants/types";

export default function (transaction: Transaction | null) {
    if (!transaction) {
        return 'Annulé';
    }

    if (transaction.status === "FAILED" || !transaction.status) {
        return 'Non Payé';
    }

    if (transaction.status === "SUCCESS") {
        return 'Succès';
    }

    return 'En Vérification';
}