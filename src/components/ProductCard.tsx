import './ProductCard.css';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  emoji: string;
};

type ProductCardProps = {
  product: Product;
  quantity: number;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
};

export function ProductCard({ product, quantity, onAdd, onRemove, disabled }: ProductCardProps) {
  return (
    <article className="product-card" aria-label={`${product.name} product`}>
      <div className="product-media" aria-hidden="true">{product.emoji}</div>
      <div className="product-content">
        <header className="product-header">
          <h3 className="product-title">{product.name}</h3>
          <span className="product-price">${product.price.toFixed(2)}</span>
        </header>
        <p className="product-description">{product.description}</p>
      </div>
      <div className="product-actions">
        <button
          className="product-button"
          type="button"
          onClick={() => onRemove(product.id)}
          disabled={disabled || quantity === 0}
          aria-label={`Remove one ${product.name}`}
        >
          –
        </button>
        <span className="product-quantity" aria-live="polite">
          {quantity}
        </span>
        <button
          className="product-button"
          type="button"
          onClick={() => onAdd(product.id)}
          disabled={disabled}
          aria-label={`Add one ${product.name}`}
        >
          +
        </button>
      </div>
    </article>
  );
}
