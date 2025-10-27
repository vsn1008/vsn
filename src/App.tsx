import { useMemo, useState, useEffect, useCallback, CSSProperties } from 'react';
import { CartSummary } from './components/CartSummary';
import { ProductCard, Product } from './components/ProductCard';
import { useTelegramWebApp } from './hooks/useTelegramWebApp';
import './styles/App.css';

const PRODUCTS: Product[] = [
  {
    id: 'iced-latte',
    name: 'Iced Latte',
    description: 'Bright espresso, milk, vanilla syrup, pebble ice.',
    price: 4.75,
    emoji: '🥤'
  },
  {
    id: 'cold-brew',
    name: 'Nitro Cold Brew',
    description: 'Slow-steeped single origin with a creamy microfoam.',
    price: 5.25,
    emoji: '🧊'
  },
  {
    id: 'matcha-tonic',
    name: 'Matcha Tonic',
    description: 'Ceremonial matcha, yuzu tonic, rosemary, bubbles.',
    price: 5.0,
    emoji: '🍃'
  }
];

type CartState = Record<string, number>;

function calculateTotals(cart: CartState) {
  let total = 0;
  let items = 0;

  for (const product of PRODUCTS) {
    const quantity = cart[product.id] ?? 0;
    total += quantity * product.price;
    items += quantity;
  }

  return { total, items };
}

export default function App() {
  const { webApp, theme, isTelegram } = useTelegramWebApp();
  const [cart, setCart] = useState<CartState>({});

  const totals = useMemo(() => calculateTotals(cart), [cart]);

  const addToCart = useCallback((id: string) => {
    setCart((previous) => ({
      ...previous,
      [id]: (previous[id] ?? 0) + 1
    }));
    webApp?.HapticFeedback?.impactOccurred('light');
  }, [webApp]);

  const removeFromCart = useCallback((id: string) => {
    setCart((previous) => {
      const next = { ...previous };
      if (!next[id]) {
        return previous;
      }

      next[id] -= 1;
      if (next[id] <= 0) {
        delete next[id];
      }
      return next;
    });
  }, []);

  const handleCheckout = useCallback(() => {
    const payload = {
      items: PRODUCTS.filter((product) => (cart[product.id] ?? 0) > 0).map((product) => ({
        id: product.id,
        name: product.name,
        quantity: cart[product.id],
        unitPrice: product.price
      })),
      total: totals.total
    };

    if (webApp) {
      webApp.sendData(JSON.stringify(payload));
    } else {
      alert(`Checkout data: ${JSON.stringify(payload, null, 2)}`);
    }
  }, [cart, totals.total, webApp]);

  useEffect(() => {
    if (!webApp) {
      return;
    }

    const button = webApp.MainButton;
    if (totals.items > 0) {
      button.setText(`Pay $${totals.total.toFixed(2)}`);
      button.show();
      button.enable();
      const handler = handleCheckout;
      button.onClick(handler);
      return () => {
        button.offClick(handler);
      };
    }

    button.hide();
    button.disable();
  }, [webApp, totals.items, totals.total, handleCheckout]);

  const inlineStyles: CSSProperties = {
    '--bg-color': theme.backgroundColor,
    '--text-color': theme.textColor,
    '--secondary-bg-color': theme.secondaryBackgroundColor,
    '--accent-color': theme.accentColor,
    '--hint-color': theme.hintColor,
    '--button-color': theme.buttonColor,
    '--button-text-color': theme.buttonTextColor
  } as CSSProperties;

  return (
    <div className="app" style={inlineStyles}>
      <main className="layout">
        <header className="layout-header">
          <div>
            <p className="eyebrow">VSN Coffee Club</p>
            <h1>Build your daily ritual</h1>
          </div>
          {!isTelegram && (
            <a
              className="open-telegram"
              href="https://t.me/"
              target="_blank"
              rel="noreferrer"
            >
              Open in Telegram
            </a>
          )}
        </header>

        <section className="products" aria-label="Featured drinks">
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] ?? 0}
              onAdd={addToCart}
              onRemove={removeFromCart}
            />
          ))}
        </section>

        <CartSummary
          total={totals.total}
          itemCount={totals.items}
          accentColor={theme.accentColor}
          hintColor={theme.hintColor}
        />

        {!isTelegram && (
          <button className="checkout-button" type="button" onClick={handleCheckout}>
            Pay ${totals.total.toFixed(2)}
          </button>
        )}
      </main>
    </div>
  );
}
