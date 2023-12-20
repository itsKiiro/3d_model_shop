export function formatCentToEuro(amount) {
    
    const euros = (amount / 100).toFixed(2);
    return euros + '€';
}