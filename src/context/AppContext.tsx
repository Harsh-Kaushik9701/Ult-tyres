'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserSession,
  CartItem,
  PricingRequest,
  Order,
  DealerApplication,
  ProductSku,
  OrderStatus,
} from '@/types';
import {
  INITIAL_PRICING_REQUESTS,
  INITIAL_ORDERS,
  INITIAL_APPLICATIONS,
  SKUS,
} from '@/data/mockData';

/** Demo role switcher and one-click demo logins. Off unless NEXT_PUBLIC_DEMO_MODE=true. */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

interface AppContextType {
  /** False until saved state has been read from the browser after mount. */
  hydrated: boolean;

  // Session
  session: UserSession | null;
  setSession: (session: UserSession | null) => void;
  switchRole: (role: 'owner' | 'buyer' | 'staff' | 'admin' | 'public') => void;

  // Cart
  cart: CartItem[];
  addToCart: (sku: ProductSku, quantity?: number, notes?: string) => void;
  updateCartQuantity: (skuId: string, quantity: number) => void;
  removeFromCart: (skuId: string) => void;
  clearCart: () => void;

  // Pricing Requests (RFQ)
  pricingRequests: PricingRequest[];
  submitPricingRequest: (params: {
    poNumber: string;
    requiredByDate: string;
    deliveryType: 'delivery' | 'pickup';
    branchOrAddress: string;
    notes?: string;
  }) => PricingRequest;
  adminQuoteRfq: (
    rfqId: string,
    lineData: { skuId: string; unitPrice: number; discountPercent?: number }[],
    staffNotes?: string,
    freight?: number,
    alternative?: { skuId: string; brand: string; pattern: string; size: string; unitPrice: number; reason: string }
  ) => void;
  dealerAcceptQuote: (rfqId: string) => Order | null;
  dealerDeclineQuote: (rfqId: string, reason?: string) => void;
  addRfqThreadMessage: (rfqId: string, message: string) => void;

  // Orders
  orders: Order[];
  adminUpdateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    note: string,
    meta?: { trackingNumber?: string; carrier?: string; bayNumber?: string }
  ) => void;
  dealerReorder: (orderId: string) => void;

  // Applications
  applications: DealerApplication[];
  submitDealerApplication: (appData: Omit<DealerApplication, 'id' | 'status' | 'submittedAt'>) => DealerApplication;
  adminApproveApplication: (appId: string, tier: 'A' | 'B' | 'C', branch: 'Rocklea' | 'Yatala' | 'Bald Hills') => void;
  adminRejectApplication: (appId: string) => void;

  // Notification Toast simulation
  recentNotification: string | null;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<UserSession | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pricingRequests, setPricingRequests] = useState<PricingRequest[]>(INITIAL_PRICING_REQUESTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [applications, setApplications] = useState<DealerApplication[]>(INITIAL_APPLICATIONS);
  const [recentNotification, setRecentNotification] = useState<string | null>(null);

  // Load from localStorage after mount. Reading it during render would make the
  // server and client HTML differ. Interim only: MongoDB replaces this store.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from browser storage */
    try {
      const storedCart = localStorage.getItem('ut_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedRfqs = localStorage.getItem('ut_rfqs');
      if (storedRfqs) setPricingRequests(JSON.parse(storedRfqs));

      const storedOrders = localStorage.getItem('ut_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedApps = localStorage.getItem('ut_apps');
      if (storedApps) setApplications(JSON.parse(storedApps));

      const storedSession = localStorage.getItem('ut_session');
      if (storedSession) setSession(JSON.parse(storedSession));
    } catch {
      // Storage unavailable (private mode, blocked): keep defaults.
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Save changes to localStorage (only after hydration, so defaults never overwrite saved state)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem('ut_cart', JSON.stringify(cart));
      localStorage.setItem('ut_rfqs', JSON.stringify(pricingRequests));
      localStorage.setItem('ut_orders', JSON.stringify(orders));
      localStorage.setItem('ut_apps', JSON.stringify(applications));
      localStorage.setItem('ut_session', JSON.stringify(session));
    } catch {
      // ignore
    }
  }, [hydrated, cart, pricingRequests, orders, applications, session]);

  const clearNotification = () => setRecentNotification(null);

  const switchRole = (role: 'owner' | 'buyer' | 'staff' | 'admin' | 'public') => {
    if (role === 'owner') {
      setSession({
        id: 'usr-dave-01',
        name: 'Dave Miller',
        email: 'dave@apexfleet.com.au',
        role: 'owner',
        dealerId: 'dlr-apex',
        dealerName: 'Apex Fleet Logistics Pty Ltd',
        branch: 'Rocklea',
        tier: 'A',
      });
      setRecentNotification('Switched to Dealer Owner (Apex Fleet Logistics - Tier A)');
    } else if (role === 'buyer') {
      setSession({
        id: 'usr-buyer-02',
        name: 'Sarah Connor',
        email: 'sarah@apexfleet.com.au',
        role: 'buyer',
        dealerId: 'dlr-apex',
        dealerName: 'Apex Fleet Logistics Pty Ltd',
        branch: 'Rocklea',
        tier: 'A',
      });
      setRecentNotification('Switched to Dealer Buyer (Apex Fleet)');
    } else if (role === 'staff') {
      setSession({
        id: 'usr-staff-03',
        name: 'Luke Workshop Tech',
        email: 'luke@apexfleet.com.au',
        role: 'staff',
        dealerId: 'dlr-apex',
        dealerName: 'Apex Fleet Logistics Pty Ltd',
        branch: 'Rocklea',
        tier: 'A',
      });
      setRecentNotification('Switched to Workshop Staff (Search & build cart; cannot submit RFQs)');
    } else if (role === 'admin') {
      setSession({
        id: 'usr-admin-manjinder',
        name: 'Manjinder Singh',
        email: 'admin@ultimatetyres.com.au',
        role: 'admin',
        branch: 'Rocklea HQ',
      });
      setRecentNotification('Switched to Ultimate Tyres Staff (Pricing Manager & Admin)');
    } else {
      setSession(null);
      setRecentNotification('Switched to Public Visitor mode (Specs visible, prices hidden)');
    }
  };

  const addToCart = (sku: ProductSku, quantity = 4, notes?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.skuId === sku.id);
      if (existing) {
        return prev.map((item) =>
          item.skuId === sku.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          skuId: sku.id,
          patternName: sku.patternCode,
          patternCode: sku.patternCode,
          brandName: sku.brandName,
          size: sku.size,
          fullSizeCode: sku.fullSizeCode,
          axlePosition: sku.axlePosition,
          quantity,
          notes,
        },
      ];
    });
    setRecentNotification(`Added ${quantity}x ${sku.brandName} ${sku.size} to RFQ Cart`);
  };

  const updateCartQuantity = (skuId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(skuId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.skuId === skuId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (skuId: string) => {
    setCart((prev) => prev.filter((item) => item.skuId !== skuId));
  };

  const clearCart = () => setCart([]);

  const submitPricingRequest = ({
    poNumber,
    requiredByDate,
    deliveryType,
    branchOrAddress,
    notes,
  }: {
    poNumber: string;
    requiredByDate: string;
    deliveryType: 'delivery' | 'pickup';
    branchOrAddress: string;
    notes?: string;
  }): PricingRequest => {
    if (!session?.dealerId || !session.dealerName) {
      throw new Error('Sign in with a dealer account to submit a pricing request.');
    }
    const quoteNum = `RFQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRfq: PricingRequest = {
      id: `rfq-${Date.now()}`,
      quoteNumber: quoteNum,
      dealerId: session.dealerId,
      dealerName: session.dealerName,
      requestedBy: session?.name || 'Authorized Buyer',
      createdAt: new Date().toISOString(),
      requiredByDate: requiredByDate || 'Within 48 hours',
      deliveryType,
      branchOrAddress,
      poNumber: poNumber || `PO-${Date.now().toString().slice(-4)}`,
      status: 'submitted',
      lines: cart.map((c) => ({
        skuId: c.skuId,
        brand: c.brandName,
        pattern: c.patternName,
        size: c.size,
        fullSizeCode: c.fullSizeCode,
        quantity: c.quantity,
      })),
      pricingStaffNotes: '',
      threadMessages: notes
        ? [
            {
              sender: `${session?.name || 'Dealer'} (${session?.dealerName || 'Account'})`,
              role: 'dealer',
              time: 'Just now',
              message: notes,
            },
          ]
        : [],
    };

    setPricingRequests((prev) => [newRfq, ...prev]);
    clearCart();
    setRecentNotification(`Request ${quoteNum} submitted! Staff notified with 2-hour SLA.`);
    return newRfq;
  };

  const adminQuoteRfq = (
    rfqId: string,
    lineData: { skuId: string; unitPrice: number; discountPercent?: number }[],
    staffNotes?: string,
    freight = 80,
    alternative?: { skuId: string; brand: string; pattern: string; size: string; unitPrice: number; reason: string }
  ) => {
    setPricingRequests((prev) =>
      prev.map((rfq) => {
        if (rfq.id !== rfqId) return rfq;

        let subtotal = 0;
        const updatedLines = rfq.lines.map((line) => {
          const match = lineData.find((l) => l.skuId === line.skuId);
          const unitPrice = match ? match.unitPrice : 320;
          const discount = match?.discountPercent || 0;
          const lineTotal = +(unitPrice * line.quantity * (1 - discount / 100)).toFixed(2);
          subtotal += lineTotal;

          return {
            ...line,
            unitPrice,
            discountPercent: discount,
            lineTotal,
            alternativeOffered: alternative,
          };
        });

        const gst = +(subtotal * 0.1).toFixed(2);
        const total = +(subtotal + freight + gst).toFixed(2);

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);

        return {
          ...rfq,
          status: 'quote_ready',
          lines: updatedLines,
          subtotal,
          freight,
          gst,
          total,
          pricingStaffNotes: staffNotes || 'Price confirmed by Commercial Desk.',
          quotedAt: new Date().toISOString(),
          expiresAt: expiryDate.toISOString(),
          assignedStaff: 'Manjinder Singh (Sales Desk)',
        };
      })
    );
    setRecentNotification(`Quote sent to dealer via SMS & Email notification!`);
  };

  const dealerAcceptQuote = (rfqId: string): Order | null => {
    const rfq = pricingRequests.find((r) => r.id === rfqId);
    if (!rfq) return null;

    const ordNum = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: ordNum,
      quoteNumber: rfq.quoteNumber,
      rfqId: rfq.id,
      dealerId: rfq.dealerId,
      dealerName: rfq.dealerName,
      createdAt: new Date().toISOString(),
      requiredByDate: rfq.requiredByDate,
      deliveryType: rfq.deliveryType,
      branchOrAddress: rfq.branchOrAddress,
      poNumber: rfq.poNumber,
      status: 'confirmed',
      subtotal: rfq.subtotal || 0,
      freight: rfq.freight || 0,
      gst: rfq.gst || 0,
      total: rfq.total || 0,
      lines: rfq.lines,
      timeline: [
        {
          status: 'confirmed',
          timestamp: 'Just now',
          note: `Quote accepted by ${session?.name || 'Dealer'} (PO: ${rfq.poNumber})`,
        },
      ],
    };

    setPricingRequests((prev) =>
      prev.map((r) => (r.id === rfqId ? { ...r, status: 'accepted' } : r))
    );
    setOrders((prev) => [newOrder, ...prev]);
    setRecentNotification(`Quote accepted! Order ${ordNum} confirmed and sent to warehouse.`);
    return newOrder;
  };

  const dealerDeclineQuote = (rfqId: string, reason = 'Price / Lead time not suitable') => {
    setPricingRequests((prev) =>
      prev.map((r) =>
        r.id === rfqId
          ? {
              ...r,
              status: 'declined',
              threadMessages: [
                ...(r.threadMessages || []),
                {
                  sender: `${session?.name || 'Dealer'}`,
                  role: 'dealer',
                  time: 'Just now',
                  message: `Quote declined: ${reason}`,
                },
              ],
            }
          : r
      )
    );
    setRecentNotification(`Quote declined. Staff notified.`);
  };

  const addRfqThreadMessage = (rfqId: string, message: string) => {
    setPricingRequests((prev) =>
      prev.map((r) => {
        if (r.id !== rfqId) return r;
        return {
          ...r,
          threadMessages: [
            ...(r.threadMessages || []),
            {
              sender: session?.name || 'User',
              role: session?.role === 'admin' ? 'staff' : 'dealer',
              time: 'Just now',
              message,
            },
          ],
        };
      })
    );
  };

  const adminUpdateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    note: string,
    meta?: { trackingNumber?: string; carrier?: string; bayNumber?: string }
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status,
          trackingNumber: meta?.trackingNumber || ord.trackingNumber,
          carrier: meta?.carrier || ord.carrier,
          bayNumber: meta?.bayNumber || ord.bayNumber,
          timeline: [
            {
              status,
              timestamp: 'Just now',
              note,
            },
            ...ord.timeline,
          ],
        };
      })
    );
    setRecentNotification(`Order ${orderId} updated to ${status}. Dealer notified via SMS.`);
  };

  const dealerReorder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    order.lines.forEach((line) => {
      const fullSku = SKUS.find((s) => s.id === line.skuId);
      if (fullSku) {
        addToCart(fullSku, line.quantity);
      }
    });
    setRecentNotification(`Reorder items added to cart! Proceed to Cart to submit fresh RFQ.`);
  };

  const submitDealerApplication = (
    appData: Omit<DealerApplication, 'id' | 'status' | 'submittedAt'>
  ): DealerApplication => {
    const newApp: DealerApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };
    setApplications((prev) => [newApp, ...prev]);
    setRecentNotification('Dealer application received! Our commercial onboarding team will review within 24 hours.');
    return newApp;
  };

  const adminApproveApplication = (
    appId: string,
    tier: 'A' | 'B' | 'C',
    branch: 'Rocklea' | 'Yatala' | 'Bald Hills'
  ) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'approved' } : app))
    );
    setRecentNotification(`Application approved! Dealer invitation link generated with Tier ${tier} at ${branch}.`);
  };

  const adminRejectApplication = (appId: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: 'rejected' } : app))
    );
    setRecentNotification(`Application status updated to declined.`);
  };

  return (
    <AppContext.Provider
      value={{
        hydrated,
        session,
        setSession,
        switchRole,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        pricingRequests,
        submitPricingRequest,
        adminQuoteRfq,
        dealerAcceptQuote,
        dealerDeclineQuote,
        addRfqThreadMessage,
        orders,
        adminUpdateOrderStatus,
        dealerReorder,
        applications,
        submitDealerApplication,
        adminApproveApplication,
        adminRejectApplication,
        recentNotification,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
