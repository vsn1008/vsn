import './CartSummary.css';

interface CartSummaryProps {
  total: number;
  itemCount: number;
  accentColor: string;
  hintColor: string;
}

export function CartSummary({ total, itemCount, accentColor, hintColor }: CartSummaryProps) {
  const subtotalText = `$${total.toFixed(2)}`;
  const itemLabel = itemCount === 1 ? 'item' : 'items';

  return (
    <section className="cart-summary" aria-live="polite">
      <header>
        <h2>Total</h2>
        <span className="cart-total" style={{ color: accentColor }}>
          {subtotalText}
        </span>
      </header>
      <p className="cart-caption" style={{ color: hintColor }}>
        {itemCount} {itemLabel} in cart
      </p>
    </section>
  );
}
